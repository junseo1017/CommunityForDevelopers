import { Request, Response, NextFunction } from "express";
import { jwtUtil } from "../utils";
import { userService } from "../services";
import { AppError } from "./error-handler";

export interface ExtendReq extends Request {
  currentUserId?: string;
}

async function loginRequired(
  req: ExtendReq,
  res: Response,
  next: NextFunction
) {
  const userToken = req.signedCookies.userinfo;

  console.log("유저토큰:", userToken);

  if (!userToken || userToken === "null") {
    next(new AppError(500, "로그인한 유저만 사용할 수 있는 서비스입니다."));
  }

  try {
    // access token verify
    const verifiedToken = jwtUtil.verifyAccess(userToken.accessToken);
    req.currentUserId = verifiedToken.userId;
    next();
  } catch (error) {
    // access token이 만료된 경우에는 새롭게 토큰을 발급하고 쿠키를 재세팅
    if ((<Error>error).message === "EXPIRED_ACCESS_TOKEN_ERROR") {
      const newAccessToken = await regenerateAccessToken(
        userToken.refreshToken
      );

      const verifiedToken = jwtUtil.verifyAccess(<string>newAccessToken);
      req.currentUserId = verifiedToken.userId;
      res.cookie("userinfo", userToken, {
        expires: new Date(Date.now() + 60000 * 1440), //24시간
        httpOnly: true,
        signed: true,
      });
      next();
      return;
    }

    next(error);
  }
}

async function regenerateAccessToken(refreshToken: string) {
  try {
    // refresh token verify
    const verifiedRefreshToken = jwtUtil.verifyRefresh(refreshToken);

    // refresh token의 userId로 유저정보 get
    const userId = verifiedRefreshToken.userId;
    const { role } = await userService.getUserInfo(userId);

    // access token 재발급
    const newAccessToken = jwtUtil.generateAccessToken({
      userId,
      role,
    });
    return newAccessToken;
  } catch (error) {
    //refresh token 만료
    if ((<Error>error).message === "EXPIRED_REFRESH_TOKEN_ERROR") {
      throw new AppError(500, "로그인 후 이용하세요.");
    }
    //유효하지 않은 refresh token
    if ((<Error>error).message === "INVALID_REFRESH_TOKEN_ERROR") {
      throw new AppError(500, "유효하지 않은 토큰입니다.");
    }
  }
}

export { loginRequired };

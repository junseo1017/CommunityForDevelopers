import { Request, Response, NextFunction } from "express";
import { jwtUtil } from "../utils";
import { userService } from "../services";

export interface ExtendReq extends Request {
  currentUserId?: string;
}

async function loginRequired(
  req: ExtendReq,
  res: Response,
  next: NextFunction
) {
  // const userToken = req.headers["authorization"]?.split(" ")[1];
  const userToken = req.signedCookies.userinfo;

  console.log("쿠키 토큰 : ", userToken);

  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    next(new Error("로그인한 유저만 사용할 수 있는 서비스입니다."));
  }

  try {
    // access token verify
    const verifiedToken = jwtUtil.verifyAccess(userToken.accessToken);
    console.log("엑세스토큰", verifiedToken);
    // 유효한 경우
    req.currentUserId = verifiedToken.userId;
    next();
  } catch (error) {
    // 유효하지 않은 경우
    console.log("엑세스토큰에러", error);
    console.log("엑세스토큰에러name", (<Error>error).name);
    console.log("엑세스토큰에러message", (<Error>error).message);
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
    console.log("리프레시토큰", verifiedRefreshToken);

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
    console.log("리프레시토큰에러", error);
    //refresh token 만료
    if ((<Error>error).message === "EXPIRED_REFRESH_TOKEN_ERROR") {
      throw new Error("로그인 후 이용하세요.");
    }
    //유효하지 않은 refresh token
    if ((<Error>error).message === "INVALID_REFRESH_TOKEN_ERROR") {
      throw new Error("유효하지 않은 토큰입니다.");
    }
  }
}

export { loginRequired };

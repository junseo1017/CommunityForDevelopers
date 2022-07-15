import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtil } from "../utils";
import { UserType } from "../db/schemas/user-schema";

export interface ExtendReq extends Request {
  currentUserId?: string;
}
interface CookieType {
  accessToken: string;
  refreshToken: string;
}

interface TokenObject {
  userId?: string;
  role?: string;
  error?: unknown;
}

function loginRequired(req: ExtendReq, res: Response, next: NextFunction) {
  // const userToken = req.headers["authorization"]?.split(" ")[1];
  const userToken = req.signedCookies.userinfo;

  console.log("쿠키 토큰 : ", userToken);

  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    // res.status(403).json({
    //   result: "forbidden-approach",
    //   reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    // });
    throw new Error("로그인한 유저만 사용할 수 있는 서비스입니다.");
  }

  const verifiedToken = tokenVerify(userToken, res);

  console.log("결과", verifiedToken);

  if (!verifiedToken) {
    throw new Error("정상적인 토큰이 아닙니다.");
  }

  req.currentUserId = verifiedToken.userId;

  next();
}

function tokenVerify(
  userToken: CookieType,
  res: Response
): TokenObject | undefined {
  // access token verify
  const accessAuth = jwtUtil.verify(userToken.accessToken);
  console.log("엑세스토큰", accessAuth);
  // 유효한 경우
  if (!accessAuth?.error) {
    return accessAuth;
  }

  // 그렇지 않은 경우 refresh

  // refresh token verify
  const refreshAuth = jwtUtil.verify(userToken.refreshToken);
  console.log("리프레시토큰", refreshAuth);

  // 유효하지 않으면
  if (refreshAuth?.error) {
    return;
  }

  // access token과 refresh token의 id값 비교
  const accessDecoded = jwtUtil.decoded(userToken.accessToken);
  console.log("디코딩결과", accessDecoded);

  // 일치하지 않으면
  if ((<JwtPayload>accessDecoded).userId !== refreshAuth?.userId) {
    return;
  }

  // access token 재발급
  const newAccessToken = jwtUtil.access(<UserType>{
    _id: (<JwtPayload>accessDecoded).userId,
    role: (<JwtPayload>accessDecoded).role,
  });

  // cookie 재설정
  res.cookie(
    "userinfo",
    { accessToken: newAccessToken, refreshToken: userToken.refreshToken },
    {
      expires: new Date(Date.now() + 60000 * 1440), //24시간
      httpOnly: true,
      signed: true,
    }
  );

  // 재확인
  return tokenVerify(
    {
      accessToken: newAccessToken,
      refreshToken: userToken.refreshToken,
    },
    res
  );
}

export { loginRequired };

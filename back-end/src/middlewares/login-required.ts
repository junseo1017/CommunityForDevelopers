import { Request, Response, NextFunction } from "express";
import { jwtUtil } from "../utils";

export interface extendReq extends Request {
  currentUserId?: string;
}

function loginRequired(req: extendReq, res: Response, next: NextFunction) {
  // const userToken = req.headers["authorization"]?.split(" ")[1];
  const userToken = req.signedCookies.userinfo;

  console.log("쿠키 토큰 : ", userToken);

  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    res.status(403).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });

    return;
  }

  try {
    //검증...ㅁㄴㅇㄻㄴㅇㄹ
    //access token verify
    const accessAuth = jwtUtil.verify(userToken.accessToken);
    // if (!accessAuth?.ok) {

    // }

    req.currentUserId = accessAuth?.userId;

    next();
  } catch (error) {
    res.status(403).json({
      result: "forbidden-approach",
      reason: "정상적인 토큰이 아닙니다.",
    });

    return;
  }
}

export { loginRequired };

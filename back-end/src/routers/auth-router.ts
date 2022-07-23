import { Router, Request, Response, NextFunction } from "express";
import { authService } from "../services";
const authRouter = Router();

// 1. Kakao 로그인 url
authRouter.get(
  "/kakao",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseUrl = "https://kauth.kakao.com/oauth/authorize";
      const config = {
        client_id: process.env.KAKAO_CLIENT_ID || "",
        redirect_uri: `http://${process.env.DOMAIN}:5000/api/oauth/kakao/callback`,
        response_type: "code",
        scope: "profile_nickname account_email",
      };
      const params = new URLSearchParams(config).toString();
      const finalUrl = `${baseUrl}?${params}`;

      res.json({ url: finalUrl });
    } catch (error) {
      next(error);
    }
  }
);

// 2. Kakao 로그인
authRouter.get(
  "/kakao/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    try {
      const { email, nickname } = await authService.getKakaoInfo(code);
      const userToken = await authService.getUserTokenByOAuth(
        email,
        nickname,
        "KAKAO"
      );

      res.cookie("userinfo", userToken, {
        expires: new Date(Date.now() + 60000 * 1440), //24시간
        httpOnly: true,
        signed: true,
      });

      res.redirect(`http://${process.env.DOMAIN}`);
    } catch (error) {
      next(error);
    }
  }
);

// 3. Github 로그인 url
authRouter.get(
  "/github",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseUrl = "https://github.com/login/oauth/authorize";
      const config = {
        client_id: process.env.GITHUB_CLIENT_ID || "",
        scope: "read:user user:email",
        allow_signup: "true",
      };
      const params = new URLSearchParams(config).toString();
      const finalUrl = `${baseUrl}?${params}`;
      res.json({ url: finalUrl });
    } catch (error) {
      next(error);
    }
  }
);

// 4. Github 로그인
authRouter.get(
  "/github/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    try {
      const { email, nickname } = await authService.getGitHubInfo(code);
      const userToken = await authService.getUserTokenByOAuth(
        email,
        nickname,
        "GITHUB"
      );

      res.cookie("userinfo", userToken, {
        expires: new Date(Date.now() + 60000 * 1440), //24시간
        httpOnly: true,
        signed: true,
      });

      res.redirect(`http://${process.env.DOMAIN}`);
    } catch (error) {
      next(error);
    }
  }
);

export { authRouter };

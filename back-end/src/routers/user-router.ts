import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { ExtendReq, loginRequired } from "../middlewares";
import {
  userCreateJoiSchema,
  userUpdateJoiSchema,
} from "../db/schemas/joi-schemas";
import axios from "axios";
import { GithubEmailInfo } from "../interfaces";
const userRouter = Router();

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { nickname, email, password } = req.body;

    try {
      await userCreateJoiSchema.validateAsync({
        email,
        nickname,
        password,
      });

      const newUser = await userService.addUser({
        nickname,
        email,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const userToken = await userService.getUserToken({ email, password });

      if (req.cookies)
        console.log("쿠키:", req.cookies, "\n인증쿠키:", req.signedCookies);

      res.cookie("userinfo", userToken, {
        expires: new Date(Date.now() + 60000 * 1440), //24시간
        httpOnly: true,
        signed: true,
      });

      res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/oauth/github",
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

      res.redirect(finalUrl);
    } catch (error) {
      next(error);
    }
})

userRouter.get(
  "/oauth/github/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.query.code as string;
      const { email, nickname } = await userService.getGitHubInfo(code);
      const userToken = await userService.getUserTokenByOAuth(email, nickname);
      if (req.cookies)
        console.log("쿠키:", req.cookies, "\n인증쿠키:", req.signedCookies);

      res.cookie("userinfo", userToken, {
        expires: new Date(Date.now() + 60000 * 1440), //24시간
        httpOnly: true,
        signed: true,
      });

      res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  })

userRouter.get(
  "/logout",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      if (req.currentUserId) {
        res.clearCookie("userinfo");
        res.status(200).json({ logout: "succeed" });
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userService.getUsers());
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/token",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      console.log(req);
      const userId = req.currentUserId;

      if (userId !== undefined) {
        const users = await userService.getUserInfo(userId);
        console.log(users);
        res.send(users);
        // res.send(users);
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
      res.send(await userService.getUserInfo(userId));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/info",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const userId = req.currentUserId || "";
    const { nickname, job, imgUrl, skills } = req.body;

    const toUpdate = {
      nickname,
      job,
      imgUrl,
      skills,
    };

    try {
      await userUpdateJoiSchema.validateAsync({ nickname });
      const updatedUserInfo = await userService.setUser(userId, toUpdate);
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/password",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const userId = req.currentUserId || "";
    const { password, currentPassword } = req.body;

    if (!currentPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다");
    }

    try {
      const updatedUserInfo = await userService.setPassword(
        { userId, currentPassword },
        password
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const userId = req.currentUserId || "";
    const currentPassword = req.body.currentPassword;

    if (!currentPassword) {
      throw new Error("정보를 삭제하려면, 현재의 비밀번호가 필요합니다.");
    }

    try {
      const deletedUserInfo = await userService.deleteUser({
        userId,
        currentPassword,
      });

      res.status(200).json(deletedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };

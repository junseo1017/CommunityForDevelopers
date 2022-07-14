import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { extendReq, loginRequired } from "../middlewares";
import {
  userCreateJoiSchema,
  userUpdateJoiSchema,
} from "../db/schemas/joi-schemas";

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
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUserId;

      if (userId !== undefined) {
        const users = await userService.getUserInfo(userId);
        res.send(users);
        // res.send(users);
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  "/info",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
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

userRouter.patch(
  "/password",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
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
  async (req: extendReq, res: Response, next: NextFunction) => {
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

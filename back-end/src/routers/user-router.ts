import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { ExtendReq, loginRequired } from "../middlewares";
import {
  userCreateJoiSchema,
  userUpdateJoiSchema,
} from "../db/schemas/joi-schemas";
import { upload, getImageUrl } from "../utils/image-util";

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

      await userService.addUser({
        nickname,
        email,
        password,
      });

      res.status(201).json({ signUp: "succeed" });
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

      res.cookie("userinfo", userToken, {
        expires: new Date(Date.now() + 60000 * 1440), //24시간
        httpOnly: true,
        signed: true,
      });

      res.status(200).json({ signIn: "succeed" });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/logout",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      if (req.currentUserId) {
        res.clearCookie("userinfo");
        res.status(200).json({ signOut: "succeed" });
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
      const userId = req.currentUserId || "";

      const users = await userService.getUserInfo(userId);
      res.status(200).json(users);
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
      const userinfo = await userService.getUserInfo(userId);
      const count = await userService.getUserContentsCount(userId);
      res.status(200).json({ userinfo, count });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/info",
  loginRequired,
  upload,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const userId = req.currentUserId || "";
    const image = req.file;
    const imgUrl = <string>await getImageUrl(<Express.Multer.File>image);

    const { nickname, job, skills } = req.body;

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
    const { password } = req.body;

    try {
      await userService.setPassword(userId, password);
      res.status(200).json({ changePassword: "succeed" });
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
    try {
      res.status(200).json(await userService.deleteUser(userId));
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };

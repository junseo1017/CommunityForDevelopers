import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";
import {
  ExtendReq,
  loginRequired,
  validateRequestWith,
  checkImage,
} from "../middlewares";
import {
  userRegisterJoi,
  userLoginJoi,
  userEmailJoi,
  userUpdateInfoJoi,
  userUpdatePWJoi,
} from "../db/schemas/joi-schemas";
import { authMailer, upload } from "../utils";

const userRouter = Router();

userRouter.post(
  "/",
  validateRequestWith(userRegisterJoi, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { nickname, email, password } = req.body;

    try {
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
  validateRequestWith(userLoginJoi, "body"),
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

userRouter.post(
  "/email",
  validateRequestWith(userEmailJoi, "body"),
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const { email, authNumber } = req.body;
    try {
      await authMailer(email, authNumber);
      res.status(200).json({ sendMail: "succeed" });
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
  checkImage,
  validateRequestWith(userUpdateInfoJoi, "body"),
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const userId = req.currentUserId || "";
    const { nickname, job } = req.body;
    const imgUrl = req.body?.imgUrl;
    const skills = req.body?.skills.split(",");
    const toUpdate = {
      nickname,
      job,
      imgUrl,
      skills,
    };

    try {
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
  validateRequestWith(userUpdatePWJoi, "body"),
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
      res.clearCookie("userinfo");
      res.status(200).json(await userService.deleteUser(userId));
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };

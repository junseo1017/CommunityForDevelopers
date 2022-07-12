import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";
import { extendReq, loginRequired } from "../middlewares";

const userRouter = Router();

// 회원가입
userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { nickname, email, password, job, imgUrl, skills } = req.body;
    console.log(req.body);
    try {
      const newUser = await userService.addUser({
        nickname,
        email,
        password,
        job,
        imgUrl,
        skills,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

// 로그인
userRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const userToken = await userService.getUserToken({ email, password });
      res.status(200).json(userToken);
    } catch (error) {
      next(error);
    }
  }
);

// 전체 유저 목록
userRouter.get(
  "/",
  loginRequired,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

// id로 유저 정보 불러오기 (token decoded)
userRouter.get(
  "/token",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUserId;

      if (userId !== undefined) {
        const users = await userService.getUserInfo(userId);
        res.send(users);
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  "/:userId",
  loginRequired,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    console.log(req.body);
    const { nickname, email, password, job, imgUrl, skills } = req.body;
    const currentPassword = req.body.currentPassword;

    if (!currentPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다");
    }

    const toUpdate = {
      nickname,
      email,
      password,
      job,
      imgUrl,
      skills,
    };

    try {
      const updatedUserInfo = await userService.setUser(
        { userId, currentPassword },
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/:userId",
  loginRequired,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
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

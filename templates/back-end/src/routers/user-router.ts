import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";

const userRouter = Router();

// 전체 유저 목록
userRouter.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //전체 사용자 목록을 얻음
      const userId = req.body.userId;
      console.log(userId);
      const users = await userService.getMyInfo(userId);
      res.send(users);
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };

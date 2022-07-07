import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services";

const userRouter = Router();

// 전체 유저 목록
userRouter.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //전체 사용자 목록을 얻음
      // const userId = req.body.userId;
      // console.log(userId);
      // const users = await userService.getMyInfo(userId);
      // res.send(users);
      console.log(process.env.MONGODB_URL);
      res.send("Express + TypeScript Server [타입스크립트로 서버실행중입니다]");
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };

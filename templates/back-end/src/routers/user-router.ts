import { Router, Request, Response, NextFunction } from "express";

const userRouter = Router();

// 전체 유저 목록
userRouter.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //전체 사용자 목록을 얻음
      // const users = await userService.getUsers();
      res.send("Express + TypeScript Server");
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };

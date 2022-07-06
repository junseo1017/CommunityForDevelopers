import { Request, Response, NextFunction } from "express";
// import { loginRequired } from "../middlewares";
import { userService } from "../services";
import { contentTypeChecker } from "../utils/content-type-checker";

const userRouter = Router();

// 내 정보 조회
userRouter.get(
  "/my",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 토큰에서 userId 추출
      const userId = req;
      // db에서 내 정보 가져옴
      const myInfo = await userService.getMyInfo(userId);

      // 내 정보에서 password를 제외하고 front에 전달
      const myInfoWithoutPwd = await userService.exceptPwd(myInfo._doc);
      res.status(200).json(myInfoWithoutPwd);
    } catch (error) {
      next(error);
    }
  }
);

// 내 게시글 조회

// 회원가입 할때 작성한 이메일로 인증코드가 담긴 메일 전송

// 회원가입

// 로그인

// 회원 정보 수정

// 회원 탈퇴

export { userRouter };

import { Router, Request, Response, NextFunction } from "express";
import { qnaService } from "../services/qna-service";
import { extendReq, loginRequired } from "../middlewares/login-required";

const qnaRouter = Router();

qnaRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const QnAs = await qnaService.getQnas();
    res.status(200).json(QnAs);
  } catch (error) {
    next(error);
  }
});

qnaRouter.get(
  "/:qnaId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qnaId = req.params.qnaId;
      const QnA = await qnaService.getQnaById(qnaId);
      res.status(200).json(QnA);
    } catch (error) {
      next(error);
    }
  }
);

qnaRouter.get(
  "/user/list",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUserId || "";
      const QnA = await qnaService.getQnaByUserId(userId);
      res.status(200).json(QnA);
    } catch (error) {
      next(error);
    }
  }
);

qnaRouter.post(
  "/",
  // loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      // const userId = req.currentUserId || "";
      // 테스트용 임시 ID값 하드코딩
      const userId = "KtXccvPJdBvT1dylCr83J";
      if (!userId) {
        throw new Error("Forbidden");
      }
      const {
        title,
        contents,
        imgUrl,
        recommends,
        tags,
        isAnswer,
        parentQnaId,
      } = req.body;
      const newQnA = await qnaService.addQna({
        title,
        contents,
        userId,
        imgUrl,
        recommends,
        tags,
        isAnswer,
        parentQnaId,
      });
      res.status(201).json(newQnA);
    } catch (error) {
      next(error);
    }
  }
);

qnaRouter.patch(
  "/:qnaId",
  // loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const qnaId = req.params.qnaId;
      // const userId = req.currentUserId || "";
      // 테스트용 임시 ID값 하드코딩
      const userId = "KtXccvPJdBvT1dylCr83J";
      if (!userId) {
        throw new Error("Forbidden");
      }

      const {
        title,
        contents,
        imgUrl,
        recommends,
        tags,
        isAnswer,
        parentQnaId,
      } = req.body;

      const toUpdate = {
        ...(title && { title }),
        ...(contents && { contents }),
        ...(imgUrl && { imgUrl }),
        ...(recommends && { recommends }),
        ...(tags && { tags }),
        ...(isAnswer && { isAnswer }),
        ...(parentQnaId && { parentQnaId }),
      };
      const updatedQnaA = await qnaService.setQna(qnaId, userId, toUpdate);
      res.status(200).json(updatedQnaA);
    } catch (error) {
      next(error);
    }
  }
);

qnaRouter.delete(
  "/:qnaId",
  // loginRequired,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qnaId = req.params.qnaId;
      // const userId = req.currentUserId || "";
      // 테스트용 임시 ID값 하드코딩
      // const userId = "KtXccvPJdBvT1dylCr83J";
      const deletedQna = await qnaService.deleteQna(qnaId);
      res.status(200).json(deletedQna);
    } catch (error) {
      next(error);
    }
  }
);

export { qnaRouter };

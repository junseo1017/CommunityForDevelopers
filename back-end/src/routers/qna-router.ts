import { Router, Request, Response, NextFunction } from "express";
import { qnaService } from "../services/qna-service";
import { ExtendReq, loginRequired } from "../middlewares/login-required";
import { upload, getImageUrl } from "../utils/img-upload";

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
  "/user/:userId",
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const QnA = await qnaService.getQnaByUserId(userId);
      res.status(200).json(QnA);
    } catch (error) {
      next(error);
    }
  }
);

qnaRouter.post(
  "/",
  loginRequired,
  upload,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const author = req.currentUserId || "";
      const { title, contents, tags, isAnswer, parentQnaId } = req.body;
      const image = req.file;
      const imgUrl = <string>await getImageUrl(<Express.Multer.File>image);
      const newQnA = await qnaService.addQna({
        title,
        contents,
        author,
        imgUrl,
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

qnaRouter.put(
  "/:qnaId",
  loginRequired,
  upload,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const qnaId = req.params.qnaId;
      const author = req.currentUserId || "";
      const image = req.file;
      const imgUrl = <string>await getImageUrl(<Express.Multer.File>image);
      const { title, contents, recommends, tags, isAnswer, parentQnaId } =
        req.body;
      const toUpdate = {
        ...(title && { title }),
        ...(contents && { contents }),
        ...(imgUrl && { imgUrl }),
        ...(recommends && { recommends }),
        ...(tags && { tags }),
        ...(isAnswer && { isAnswer }),
        ...(parentQnaId && { parentQnaId }),
      };
      const updatedQnaA = await qnaService.setQna(qnaId, author, toUpdate);
      res.status(200).json(updatedQnaA);
    } catch (error) {
      next(error);
    }
  }
);

qnaRouter.put(
  "/:qnaId/recommendation",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const qnaId = req.params.qnaId;
      const userId = req.currentUserId || "";
      const recommended = req.query.recommended === "true";
      const updatedQnA = await qnaService.recommendQna(
        qnaId,
        userId,
        recommended
      );
      res.status(200).json(updatedQnA);
    } catch (error) {
      next(error);
    }
  }
);
qnaRouter.delete(
  "/:qnaId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const qnaId = req.params.qnaId;
      const userId = req.currentUserId || "";
      const deletedQna = await qnaService.deleteQna(qnaId, userId);
      res.status(200).json(deletedQna);
    } catch (error) {
      next(error);
    }
  }
);

export { qnaRouter };

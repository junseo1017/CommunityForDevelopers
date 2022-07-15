import { Router, Response, NextFunction } from "express";
import { ExtendReq, loginRequired } from "../middlewares/login-required";
import { commentService, portfolioService, qnaService } from "../services";

const commentRouter = Router();

commentRouter.post(
  "/portfolio/:id",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const content = req.body.content;
      const author = req.currentUserId || "";
      const newComment = await commentService.addComment({
        postId,
        content,
        author,
      });
      await portfolioService.setPortfolioComment(postId, newComment._id);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.post(
  "/qna/:id",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const content = req.body.content;
      const author = req.currentUserId || "";
      const newComment = await commentService.addComment({
        postId,
        content,
        author,
      });
      await qnaService.setQnaComment(postId, newComment._id);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.put(
  "/:commentId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const commentId = req.params.commentId;
      const userId = req.currentUserId || "";
      const content = req.body.content;
      const toUpdate = { ...(content && { content }) };
      const updatedCommentInfo = await commentService.setComment(
        commentId,
        userId,
        toUpdate
      );
      res.status(200).json(updatedCommentInfo);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.delete(
  "/:commentId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const commentId = req.params.commentId;
      const userId = req.currentUserId || "";
      const deletedComment = await commentService.deleteComment(
        commentId,
        userId
      );
      res.status(200).json(deletedComment);
    } catch (error) {
      next(error);
    }
  }
);

export { commentRouter };

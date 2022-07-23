import { Router, Response, NextFunction } from "express";
import { ExtendReq, loginRequired } from "../middlewares/login-required";
import { commentService, portfolioService, qnaService } from "../services";
import { Types } from "mongoose";
import { validateRequestWith } from "../middlewares";
import { commentInputJoi, commentDeleteJoi } from "../db/schemas/joi-schemas";

const commentRouter = Router();

// 1. 포토폴리오 댓글 작성
commentRouter.post(
  "/portfolio/:id",
  loginRequired,
  validateRequestWith(commentInputJoi, "body"),
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

// 2. QnA 댓글 작성
commentRouter.post(
  "/qna/:id",
  loginRequired,
  validateRequestWith(commentInputJoi, "body"),
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

// 3. 댓글 수정
commentRouter.put(
  "/:commentId",
  loginRequired,
  validateRequestWith(commentInputJoi, "body"),
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
// 4. 댓글 삭제
commentRouter.delete(
  "/:commentId",
  loginRequired,
  validateRequestWith(commentDeleteJoi, "query"),
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const commentId = req.params.commentId;
      const id = new Types.ObjectId(commentId);
      const userId = req.currentUserId || "";
      const portId = req.query.portId as string;
      if (portId) {
        await portfolioService.deletePortfolioComment(portId, id);
      }

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

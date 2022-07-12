import { Router, Request, Response, NextFunction } from "express";
import { extendReq, loginRequired } from "../middlewares/login-required";
import { commentService, portfolioService } from "../services";

const commentRouter = Router();

commentRouter.post(
  "/:postId",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId;
      const content = req.body.content;
      const author = req.currentUserId || "";
      const newComment = await commentService.addComment({
        postId,
        content,
        author,
      });
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.put(
  "/:commentId",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
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

export { commentRouter };

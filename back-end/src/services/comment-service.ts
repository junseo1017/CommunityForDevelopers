import { commentModel, CommentModel } from "../db";
import { ICommentForUpdate, ICommentInput } from "../interfaces";

class CommentService {
  commentModel;
  constructor(commentModel: CommentModel) {
    this.commentModel = commentModel;
  }
  async getComment(postId: string) {
    return await commentModel.findById(postId);
  }

  async addComment(commentInfo: ICommentInput) {
    return await commentModel.create(commentInfo);
  }
  async setComment(
    commentId: string,
    userId: string,
    commentInfo: ICommentForUpdate
  ) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new Error("댓글 정보가 없습니다.");
    }
    if (!comment.author.equals(userId)) {
      throw new Error("Forbidden");
    }
    return await commentModel.update(commentId, commentInfo);
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new Error("해당 댓글이 존재하지 않습니다.");
    }
    if (!comment.author.equals(userId)) {
      throw new Error("Forbidden");
    }
    return await this.commentModel.deleteById(commentId);
  }
}

const commentService = new CommentService(commentModel);
export { commentService };

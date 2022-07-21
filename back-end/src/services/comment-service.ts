import { commentModel, CommentModel } from "../db";
import { ICommentForUpdate, ICommentInput } from "../interfaces";
import { AppError } from "../middlewares/error-handler";
class CommentService {
  commentModel;
  constructor(commentModel: CommentModel) {
    this.commentModel = commentModel;
  }

  async addComment(commentInfo: ICommentInput) {
    const newComment = await commentModel.create(commentInfo);
    if (!newComment) {
      throw new AppError(400, "댓글 작성에 실패하였습니다.");
    }
    return newComment;
  }

  async setComment(
    commentId: string,
    userId: string,
    commentInfo: ICommentForUpdate
  ) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new AppError(400, "댓글 정보가 없습니다.");
    }
    if (!comment.author.equals(userId)) {
      throw new AppError(
        403,
        "자신의 댓글만 수정 가능합니다.",
        "Forbidden-Error"
      );
    }
    return await commentModel.update(commentId, commentInfo);
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new AppError(400, "댓글 정보가 없습니다.");
    }
    if (!comment.author.equals(userId)) {
      throw new AppError(
        403,
        "자신의 댓글만 삭제 가능합니다.",
        "Forbidden-Error"
      );
    }
    return await this.commentModel.deleteById(commentId);
  }
}

const commentService = new CommentService(commentModel);
export { commentService };

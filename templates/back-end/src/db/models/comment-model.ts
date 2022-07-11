import { model } from "mongoose";
import { CommentSchema } from "../schemas/comment-schema";
import { ICommentForUpdate, ICommentInput } from "../../interfaces";
const Comment = model("comments", CommentSchema);

export class CommentModel {
  async findById(commentId: string) {
    return await Comment.findOne({ commentId });
  }

  async create(commentInfo: ICommentInput) {
    return await Comment.create(commentInfo);
  }

  async update(commentId: string, update: ICommentForUpdate) {
    const filter = { commentId };
    const option = { returnOriginal: false };

    return await Comment.findOneAndUpdate(filter, update, option);
  }

  async updateFordelete(portId: string) {
    return await Comment.findOneAndDelete({ portId });
  }
}

const commentModel = new CommentModel();
export { commentModel };

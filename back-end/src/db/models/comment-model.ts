import { model } from "mongoose";
import { CommentSchema, CommentType } from "../schemas/comment-schema";
import { ICommentForUpdate, ICommentInput } from "../../interfaces";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

const Comment = model<CommentType, SoftDeleteModel<CommentType>>(
  "comments",
  CommentSchema
);
export class CommentModel {
  async findById(commentId: string) {
    return await Comment.findOne({ _id: commentId });
  }

  async create(commentInfo: ICommentInput) {
    return await Comment.create(commentInfo);
  }

  async update(commentId: string, update: ICommentForUpdate) {
    const filter = { _id: commentId };
    const option = { returnOriginal: false };

    return await Comment.findOneAndUpdate(filter, update, option);
  }

  async deleteById(commentId: string) {
    return await Comment.softDelete({ _id: commentId });
  }
}

const commentModel = new CommentModel();
export { commentModel };

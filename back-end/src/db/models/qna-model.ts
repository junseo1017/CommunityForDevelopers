import { model, Types, Document } from "mongoose";
import { QnaSchema, QnaType } from "../schemas/qna-schema";
import { QnaInputDTO } from "../../interfaces/qna-interface";

const Qna = model<QnaType & Document>("qnas", QnaSchema);

export class QnaModel {
  async findAll() {
    return await Qna.find({}).populate({
      path: "author",
      select: "nickname",
    });
  }

  async findById(qnaId: string) {
    return await Qna.findOne({ _id: qnaId }).populate([
      {
        path: "author",
        select: "nickname",
      },
      {
        path: "recommends",
        select: "nickname",
      },
      {
        path: "comments",
        populate: {
          path: "author",
          select: "nickname",
        },
      },
    ]);
  }

  async findByUserId(userId: string) {
    return await Qna.find({ author: userId }).populate({
      path: "author",
      select: "nickname",
    });
  }

  async create(qnaInfo: QnaInputDTO) {
    return await Qna.create(qnaInfo);
  }

  async update(qnaId: string, update: QnaInputDTO) {
    const filter = { qnaId };
    const option = { returnOriginal: false };

    return await Qna.findOneAndUpdate(filter, update, option);
  }

  async updateComment(qnaId: string, commentId: Types.ObjectId) {
    const filter = { _id: qnaId };
    const option = { returnOriginal: false };
    return await Qna.findOneAndUpdate(
      filter,
      { $addToSet: { comments: commentId } },
      option
    );
  }

  async addRecommend(qnaId: string, userId: string) {
    const filter = { _id: qnaId };
    const option = { returnOriginal: false };
    return await Qna.findOneAndUpdate(
      filter,
      { $addToSet: { recommends: userId } },
      option
    );
  }

  async deleteRecommend(qnaId: string, userId: string) {
    const filter = { _id: qnaId };
    const option = { returnOriginal: false };
    return await Qna.findOneAndUpdate(
      filter,
      { $pull: { recommends: userId } },
      option
    );
  }

  async deleteById(qnaId: string) {
    return await Qna.findOneAndDelete({ _id: qnaId });
  }
}

const qnaModel = new QnaModel();

export { qnaModel };

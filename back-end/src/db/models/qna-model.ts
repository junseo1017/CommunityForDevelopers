import { model, Types } from "mongoose";
import { QnaSchema } from "../schemas/qna-schema";
import { QnaInputDTO } from "../../interfaces/qna-interface";

const Qna = model("qnas", QnaSchema);

export class QnaModel {
  async findAll() {
    return await Qna.find({});
  }

  async findById(qnaId: string) {
    return await Qna.findOne({ _id: qnaId }).populate([
      {
        path: "author",
        select: "nickname",
      },
      {
        path: "comments",
        populate: {
          path: "author",
          select: ["nickname", "deleted"],
        },
      },
    ]);
  }

  async findByUserId(userId: string) {
    return await Qna.find({ userId });
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
    const filter = { qnaId };
    const option = { returnOriginal: false };

    return await Qna.findOneAndUpdate(
      filter,
      { $addToSet: { comments: commentId } },
      option
    );
  }
  async deleteById(qnaId: string) {
    return await Qna.findOneAndDelete({ qnaId });
  }
}

const qnaModel = new QnaModel();

export { qnaModel };

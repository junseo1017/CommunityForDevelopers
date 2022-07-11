import { model } from "mongoose";
import { QnaSchema } from "../schemas/qna-schema";
import { IQnaInputDTO } from "../../interfaces/qna-interface";

const Qna = model("qnas", QnaSchema);

export class QnaModel {
  async findAll() {
    return await Qna.find({});
  }

  async findById(qnaId: string) {
    return await Qna.findOne({ qnaId });
  }

  async findByUserId(userId: string) {
    return await Qna.find({ userId });
  }

  async create(qnaInfo: IQnaInputDTO) {
    return await Qna.create(qnaInfo);
  }

  async update(qnaId: string, update: IQnaInputDTO) {
    const filter = { qnaId };
    const option = { returnOriginal: false };

    return await Qna.findOneAndUpdate(filter, update, option);
  }

  async deleteById(qnaId: string) {
    return await Qna.findOneAndDelete({ qnaId });
  }
}

const qnaModel = new QnaModel();

export { qnaModel };

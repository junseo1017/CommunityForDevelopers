import { Types } from "mongoose";
import { qnaModel, QnaModel } from "../db/models/qna-model";
import { QnaInputDTO } from "../interfaces/qna-interface";
class QnaService {
  constructor(private qnaModel: QnaModel) {
    this.qnaModel = qnaModel;
  }
  async addQna(qnaInfo: QnaInputDTO) {
    const { title, contents, author, imgUrl, tags, isAnswer, parentQnaId } =
      qnaInfo;
    const newQnaInfo = {
      title,
      contents,
      author,
      imgUrl,
      tags,
      isAnswer,
      parentQnaId,
    };
    return await this.qnaModel.create(newQnaInfo);
  }

  async getQnas() {
    const QnAs = await this.qnaModel.findAll();
    if (!QnAs) {
      throw new Error("QnA 목록이 존재하지 않습니다.");
    }
    return QnAs;
  }

  async getQnaById(qnaId: string) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new Error("QnA가 존재하지 않습니다.");
    }
    return QnA;
  }

  async getQnaByUserId(userId: string) {
    const QnA = await this.qnaModel.findByUserId(userId);
    if (!QnA) {
      throw new Error("QnA가 존재하지 않습니다.");
    }
    return QnA;
  }

  async getAnswerByQuestion(qnaId: string) {
    const answers = await this.qnaModel.findAnswerById(qnaId);
    return answers;
  }

  async setQna(qnaId: string, userId: string, qnaInfo: QnaInputDTO) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new Error("QnA 정보가 없습니다.");
    }
    if (!QnA.author.equals(userId)) {
      throw new Error("Forbidden");
    }
    return await this.qnaModel.update(qnaId, qnaInfo);
  }

  async setQnaComment(qnaId: string, commentId: Types.ObjectId) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new Error("QnA정보가 없습니다.");
    }
    return await this.qnaModel.updateComment(qnaId, commentId);
  }
  async recommendQna(qnaId: string, userId: string, recommended: boolean) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new Error("QnA정보가 없습니다.");
    }
    if (recommended) {
      return await this.qnaModel.addRecommend(qnaId, userId);
    }
    return await this.qnaModel.deleteRecommend(qnaId, userId);
  }

  async deleteQna(qnaId: string, userId: string) {
    const QnA = await this.qnaModel.deleteById(qnaId);
    if (!QnA) {
      throw new Error("해당 QnA가 존재하지 않습니다.");
    }
    if (!QnA.author.equals(userId)) {
      throw new Error("Forbidden");
    }
    return QnA;
  }
}

const qnaService = new QnaService(qnaModel);
export { qnaService };

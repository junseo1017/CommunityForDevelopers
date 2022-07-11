import { qnaModel, QnaModel } from "../db/models/qna-model";
import { IQna, IQnaInputDTO } from "../interfaces/qna-interface";
class QnaService {
  constructor(private qnaModel: QnaModel) {
    this.qnaModel = qnaModel;
  }
  async addQna(qnaInfo: IQnaInputDTO) {
    const {
      title,
      contents,
      userId,
      imgUrl,
      recommends,
      tags,
      isAnswer,
      parentQnaId,
    } = qnaInfo;
    const newQnaInfo = {
      title,
      contents,
      userId,
      imgUrl,
      recommends,
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

  async setQna(qnaId: string, userId: string, qnaInfo: IQnaInputDTO) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new Error("QnA 정보가 없습니다.");
    }
    // if (QnA.userId !== userId) {
    //   throw new Error("Forrbidden");
    // }
    return await this.qnaModel.update(qnaId, qnaInfo);
  }
  async deleteQna(qnaId: string) {
    const QnA = await this.qnaModel.deleteById(qnaId);
    if (!QnA) {
      throw new Error("해당 QnA가 존재하지 않습니다.");
    }
    return QnA;
  }
}

const qnaService = new QnaService(qnaModel);
export { qnaService };

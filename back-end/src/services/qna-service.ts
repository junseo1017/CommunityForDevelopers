import { Types } from "mongoose";
import { qnaModel, QnaModel } from "../db/models/qna-model";
import { QnaInputDTO } from "../interfaces/qna-interface";
import { AppError } from "../middlewares/error-handler";
class QnaService {
  constructor(private qnaModel: QnaModel) {
    this.qnaModel = qnaModel;
  }
  async addQna(qnaInfo: QnaInputDTO) {
    const {
      title,
      contents,
      contentText,
      authorId,
      author,
      tags,
      isAnswer,
      parentQnaId,
    } = qnaInfo;
    const newQnaInfo = {
      title,
      contents,
      contentText,
      author,
      authorId,
      tags,
      isAnswer,
      parentQnaId,
    };
    return await this.qnaModel.create(newQnaInfo);
  }

  async getQuestions(page: number) {
    const QnAs = await this.qnaModel.findQuestions(page);
    if (!QnAs) {
      throw new AppError(400, "QnA 정보가 없습니다.");
    }
    return QnAs;
  }

  async getQnaById(qnaId: string) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new AppError(400, "QnA 정보가 없습니다.");
    }
    return QnA;
  }

  async getQnaByUserId(userId: string) {
    const QnA = await this.qnaModel.findByUserId(userId);
    if (!QnA) {
      throw new AppError(400, "QnA 정보가 없습니다.");
    }
    return QnA;
  }

  async getAnswerByQuestion(qnaId: string) {
    return await this.qnaModel.findAnswerById(qnaId);
  }

  async getQnasBySearch(value: string, page: number) {
    const QnAs = await this.qnaModel.findBySearch(value, page);
    if (!QnAs) {
      throw new AppError(400, "검색 과정에서 문제가 발생하였습니다.");
    }
    return QnAs;
  }

  async setQna(qnaId: string, userId: string, qnaInfo: QnaInputDTO) {
    const QnA = await this.qnaModel.findById(qnaId);
    if (!QnA) {
      throw new AppError(400, "QnA 정보가 없습니다.");
    }
    if (!QnA.authorId.equals(userId)) {
      throw new AppError(
        403,
        "자신의 QnA만 수정 가능합니다.",
        "Forbidden Error"
      );
    }
    return await this.qnaModel.update(qnaId, qnaInfo);
  }

  async setQnaComment(qnaId: string, commentId: Types.ObjectId) {
    const QnA = await this.qnaModel.updateComment(qnaId, commentId);
    if (!QnA) {
      throw new AppError(400, "댓글을 작성할 QnA 정보가 없습니다.");
    }
    return QnA;
  }
  async recommendQna(qnaId: string, userId: string, recommended: boolean) {
    if (recommended) {
      const QnA = await this.qnaModel.addRecommend(qnaId, userId);
      if (!QnA) {
        throw new AppError(400, "추천할 QnA정보가 없습니다.");
      }
      return QnA;
    }
    const QnA = await this.qnaModel.deleteRecommend(qnaId, userId);
    if (!QnA) {
      throw new AppError(400, "추천 취소할 QnA정보가 없습니다.");
    }
    return QnA;
  }

  async deleteQna(qnaId: string, userId: string) {
    const QnA = await this.qnaModel.deleteById(qnaId);
    if (!QnA) {
      throw new AppError(400, "QnA 정보가 없습니다.");
    }
    if (!QnA.authorId.equals(userId)) {
      throw new AppError(
        403,
        "자신의 QnA만 삭제 가능합니다.",
        "Forbidden Error"
      );
    }
    return QnA;
  }
}

const qnaService = new QnaService(qnaModel);
export { qnaService };

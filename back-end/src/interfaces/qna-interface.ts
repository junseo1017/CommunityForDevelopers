export interface Qna {
  qnaId: string;
  title: string;
  contents: string;
  author: string;
  recommends: string[];
  tags: string[];
  isAnswer: boolean;
  parentQnaId: string;
}

export interface QnaInputDTO {
  title: string;
  contents: string;
  author: string;
  tags: string[];
  isAnswer: boolean;
  parentQnaId: string;
}

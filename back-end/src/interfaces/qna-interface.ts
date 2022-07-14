export interface Qna {
  qnaId: string;
  title: string;
  contents: string;
  author: string;
  imgUrl: string;
  recommends: string[];
  tags: string[];
  isAnswer: boolean;
  parentQnaId: string;
}

export interface QnaInputDTO {
  title: string;
  contents: string;
  author: string;
  imgUrl: string;
  tags: string[];
  isAnswer: boolean;
  parentQnaId: string;
}

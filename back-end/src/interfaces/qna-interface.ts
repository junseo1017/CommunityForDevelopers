export interface IQna {
  qnaId: string;
  title: string;
  contents: string;
  userId: string;
  imgUrl: string;
  recommends: string[];
  tags: string[];
  isAnswer: boolean;
  parentQnaId: string;
}

export interface IQnaInputDTO {
  title: string;
  contents: string;
  userId: string;
  imgUrl: string;
  recommends: string[];
  tags: string[];
  isAnswer: boolean;
  parentQnaId: string;
}

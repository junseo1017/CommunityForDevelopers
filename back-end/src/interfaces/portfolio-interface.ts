export interface InputDTO {
  authorId: string;
  author: string;
  authorImg: string;
  title: string;
  description: string;
  skills: string[];
  content: string;
  contentText: string;
  thumbnail: string;
}

export interface UpdateInfo {
  title: string;
  description: string;
  skills: string[];
  content: string;
  contentText: string;
  thumbnail: string;
}

export interface SearchInfo {
  options: string[];
  value: string;
  orderBy: string;
  skills: string[];
}

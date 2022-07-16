export interface InputDTO {
  author: string;
  title: string;
  description: string;
  skills: string[];
  content: string;
  contentText: string;
}

export interface UpdateInfo {
  title: string;
  description: string;
  skills: string[];
  content: string;
  contentText: string;
}

export interface SearchInfo {
  options: string[];
  value: string;
  orderBy: string;
  skills: string[];
}

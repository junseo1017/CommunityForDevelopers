export interface IPort {
  author: string;
  title: string;
  description: string;
  skills: string[];
  content: string;
}

export interface IPortInputDTO {
  title: string;
  description: string;
  skills: string[];
  content: string;
}

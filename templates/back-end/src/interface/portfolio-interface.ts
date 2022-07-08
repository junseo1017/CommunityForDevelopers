export interface IPort {
  userId: string;
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

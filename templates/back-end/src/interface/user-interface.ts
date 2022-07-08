import { Document } from "mongoose";
export interface IUser extends Document {
  userId: string;
  nickname: string;
  email: string;
  password: string;
  job?: string;
  imageUrl: string;
  skills: string[];
  scraps?: string[];
  role: string;
  deleted: boolean;
}

export interface IUserInputDTO extends Document {
  nickname: string;
  email: string;
  password: string;
  job?: string;
  imageUrl: string;
  skills: string[];
  scraps?: string[];
}

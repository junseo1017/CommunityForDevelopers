import { AppError } from "./error-handler";
import { Request, Response, NextFunction } from "express";
type ParameterType = "query" | "body" | "params";
const validateBodyWith = (schema: any, paramLocation: ParameterType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[paramLocation]);
      next();
    } catch (error) {
      next(new AppError(400, (<Error>error).message));
    }
  };
};

export { validateBodyWith };

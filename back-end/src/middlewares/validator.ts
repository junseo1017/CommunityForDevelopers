import { AppError } from "./error-handler";
import { Response, NextFunction } from "express";
import Joi from "joi";
import { ExtendReq } from "../middlewares";
type ParameterType = "query" | "body" | "params";
const validateRequestWith = (
  schema: Joi.Schema,
  paramLocation: ParameterType
) => {
  return async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[paramLocation]);
      next();
    } catch (error) {
      next(new AppError(400, (<Error>error).message));
    }
  };
};

export { validateRequestWith };

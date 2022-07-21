import { AppError } from "./error-handler";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
type ParameterType = "query" | "body" | "params";
const validateRequestWith = (
  schema: Joi.Schema,
  paramLocation: ParameterType
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("조이 req:body:", req.body);
      console.log("조이 req[paramLocation]:", req[paramLocation]);
      await schema.validateAsync(req[paramLocation]);
      next();
    } catch (error) {
      next(new AppError(400, (<Error>error).message));
    }
  };
};

export { validateRequestWith };

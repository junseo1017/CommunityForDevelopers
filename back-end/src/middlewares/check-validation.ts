import { Response, NextFunction } from "express";
import { ExtendReq } from "../middlewares";
import * as Validators from "../db/schemas/joi-schemas";
import { AppError } from "../middlewares";

export function Validator(validator: string) {
  console.log(Validators);
  console.log(typeof Validators);
  console.log(validator);
  console.log(typeof validator);
  // if (!Validators.hasOwnProperty(validator)) {
  if (Object.prototype.hasOwnProperty.call(Validators, validator)) {
    throw new AppError(500, "유효성 검사를 할 수 없습니다.");
  }

  return async function (req: ExtendReq, res: Response, next: NextFunction) {
    try {
      // const validated = await Validators[validator].validateAsync(req.body);

      // req.body = validated;
      next();
    } catch (error) {
      if ((<Error>error).name) {
        next(
          new AppError(
            422,
            "데이터 형식 혹은 타입에 문제가 있습니다. 다시 한번 확인해주세요."
          )
        );
      }
    }
  };
}

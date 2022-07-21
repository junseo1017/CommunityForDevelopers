import { Response, NextFunction } from "express";
import { ExtendReq } from "../middlewares";
import { getImageUrl } from "../utils";

async function checkImage(req: ExtendReq, res: Response, next: NextFunction) {
  try {
    const image = req.file;
    req.body.imgUrl = "";
    if (image) {
      const imgUrl = <string>await getImageUrl(<Express.Multer.File>image);
      req.body.imgUrl = imgUrl;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { checkImage };

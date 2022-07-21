import { Request, Response, NextFunction } from "express";
import { getImageUrl } from "../utils";

async function checkImage(req: Request, res: Response, next: NextFunction) {
  try {
    const image = req.file;
    if (image) {
      const imgUrl = <string>await getImageUrl(<Express.Multer.File>image);
      req.body.imgUrl = imgUrl;
      next();
    }
  } catch (error) {
    next(error);
  }
}

export { checkImage };

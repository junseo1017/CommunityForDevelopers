import { Router, Request, Response, NextFunction } from "express";
import { loginRequired } from "../middlewares";
import { upload, getImageUrl, deleteImage } from "../utils";

const imgRouter = Router();

imgRouter.post(
  "/",
  loginRequired,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.file;
      const imgUrl = <string>await getImageUrl(<Express.Multer.File>image);

      res.status(200).json({ imgUrl });
    } catch (error) {
      next(error);
    }
  }
);

imgRouter.delete(
  "/",
  loginRequired,
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    const imgUrl = req.body.imgUrl;
    try {
      await deleteImage(imgUrl);
      res.status(200).json({ deleted: "succeed" });
    } catch (error) {
      next(error);
    }
  }
);

export { imgRouter };

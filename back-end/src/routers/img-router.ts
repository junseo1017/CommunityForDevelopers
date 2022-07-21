import { Router, Request, Response, NextFunction } from "express";
import { loginRequired, checkImage } from "../middlewares";
import { upload, deleteImage } from "../utils";

const imgRouter = Router();

imgRouter.post(
  "/",
  loginRequired,
  upload,
  checkImage,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imgUrl = req.body.imgUrl;
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
      if (imgUrl) {
        await deleteImage(imgUrl);
        res.status(200).json({ deleted: "succeed" });
      }
      res.status(500).json({ failed: "Image URL이 없습니다." });
    } catch (error) {
      next(error);
    }
  }
);

export { imgRouter };

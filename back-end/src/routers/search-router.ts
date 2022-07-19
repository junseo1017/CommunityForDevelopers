import { Router, Request, Response, NextFunction } from "express";
import { portfolioService, userService } from "../services";

const searchRouter = Router();

searchRouter.get(
  "/portfolios",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = (req.query.option as string[]) || [
        "title",
        "contentText",
        "author",
      ];
      const value = req.query.value as string;
      const orderBy = (req.query.orderBy as string) || "createdAt";
      const skills = req.query.skill as string[];
      const searchInfo = { options, value, orderBy, skills };

      const page = parseInt(req.query.page as string);
      const Portfolios = await portfolioService.getPortfoliosBySearch(
        searchInfo,
        page
      );
      res.status(200).json(Portfolios);
    } catch (error) {
      next(error);
    }
  }
);

export { searchRouter };

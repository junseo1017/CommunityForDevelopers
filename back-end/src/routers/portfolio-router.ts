import { Router, Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolio-service";
import { ExtendReq, loginRequired } from "../middlewares/login-required";
import { upload, getImageUrl } from "../utils/img-upload";

const portfolioRouter = Router();

portfolioRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lastId = req.query.lastId as string;
      const Portfolios = await portfolioService.getPortfolios(lastId);
      res.status(200).json(Portfolios);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/:portId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const Portfolio = await portfolioService.getPortfolio(portId);
      res.status(200).json(Portfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/search/list",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = req.query.option as string[];
      const value = req.query.value as string;
      const orderBy = req.query.orderBy as string;
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

portfolioRouter.get(
  "/user/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const Portfolio = await portfolioService.getUserPortfolio(userId);
      res.status(200).json(Portfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/user/:userId/scraps",
  loginRequired,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      res.status(200).json(await portfolioService.getUserScraps(userId));
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.post(
  "/",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const author = req.currentUserId || "";
      const { title, description, skills, content, contentText } = req.body;
      const newPortfolio = await portfolioService.addPortfolio({
        author,
        title,
        description,
        skills,
        content,
        contentText,
      });
      res.status(201).json(newPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.put(
  "/:portId/",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const userId = req.currentUserId || "";
      const field = req.query.field as string;
      const adding = req.query.adding === "true";
      const updatedPortfolio = await portfolioService.setField(
        portId,
        userId,
        field,
        adding
      );
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.put(
  "/:portId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const author = req.currentUserId || "";
      const { title, description, skills, content, contentText } = req.body;
      const toUpdate = {
        ...(title && { title }),
        ...(description && { description }),
        ...(skills && { skills }),
        ...(content && { content }),
        ...(contentText && { contentText }),
      };
      const updatedPortfolioInfo = await portfolioService.setPortfolio(
        portId,
        author,
        toUpdate
      );
      res.status(200).json(updatedPortfolioInfo);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.delete(
  "/:portId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const author = req.currentUserId || "";
      const deletedPortfolioInfo = await portfolioService.deletePortfolio(
        portId,
        author
      );
      res.status(200).json(deletedPortfolioInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { portfolioRouter };

import { Router, Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolio-service";
import { extendReq, loginRequired } from "../middlewares/login-required";
import { portfolioJoiSchema } from "../db/schemas/joi-schemas/portfolio-schema";
const portfolioRouter = Router();

portfolioRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Portfolios = await portfolioService.getPortfolios();
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
  "/user/list",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUserId || "";
      const Portfolio = await portfolioService.getUserPortfolio(userId);
      res.status(200).json(Portfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.post(
  "/",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const author = req.currentUserId || "";
      const { title, description, skills, content } = req.body;
      await portfolioJoiSchema.validateAsync({
        author,
        title,
        description,
        skills,
        content,
      });
      const newPortfolio = await portfolioService.addPortfolio({
        author,
        title,
        description,
        skills,
        content,
      });
      res.status(201).json(newPortfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.put(
  "/:portId",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const author = req.currentUserId || "";
      const { title, description, skills, content } = req.body;
      await portfolioJoiSchema.validateAsync({
        author,
        title,
        description,
        skills,
        content,
      });
      const toUpdate = {
        ...(title && { title }),
        ...(description && { description }),
        ...(skills && { skills }),
        ...(content && { content }),
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
  async (req: extendReq, res: Response, next: NextFunction) => {
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
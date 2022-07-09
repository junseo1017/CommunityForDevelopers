import { Router, Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolio-service";
import { extendReq, loginRequired } from "../middlewares/login-required";

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

portfolioRouter.post(
  "/add",
  loginRequired,
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUserId || "";
      if (!userId) {
        throw new Error("Forbidden");
      }
      const { title, description, skills, content } = req.body;
      const newPortfolio = await portfolioService.addPortfolio({
        userId,
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
  async (req: extendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const userId = req.currentUserId || "";
      if (!userId) {
        throw new Error("Forbidden");
      }
      const { title, description, skills, content } = req.body;
      const toUpdate = {
        ...(title && { title }),
        ...(description && { description }),
        ...(skills && { skills }),
        ...(content && { content }),
      };
      const updatedPortfolioInfo = await portfolioService.setPortfolio(
        portId,
        userId,
        toUpdate
      );
      res.status(200).json(updatedPortfolioInfo);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.delete(
  "/:portid",
  loginRequired,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const deletedPortfolioInfo = await portfolioService.deletePortfolio(
        portId
      );
      res.status(200).json(deletedPortfolioInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { portfolioRouter };

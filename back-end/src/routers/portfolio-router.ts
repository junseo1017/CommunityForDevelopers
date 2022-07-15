import { Router, Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolio-service";
import { ExtendReq, loginRequired } from "../middlewares/login-required";
import { portfolioJoiSchema } from "../db/schemas/joi-schemas";

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
      console.log("wow", Portfolio);
      res.status(200).json(Portfolio);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let options = [];
      const skillList = req.query.skill as string[];
      const search = req.query.search as string;
      if (search) {
        if (typeof req.query.option === "string") {
          options.push({ [req.query.option as string]: new RegExp(search) });
        } else {
          const optionList = req.query.option as string[];
          optionList.map((option) => {
            options.push({ [option]: new RegExp(search) });
          });
        }
      }
      options.push({ skills: { $in: skillList } });
      const orderBy = req.query.orderBy as string;
      const Portfolios = await portfolioService.getPortfoliosBySearch(
        options,
        orderBy
      );
      res.status(200).json(Portfolios);
    } catch (error) {
      next(error);
    }
  }
);

portfolioRouter.get(
  "/user/:userId",
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
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
  "/:portId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const author = req.currentUserId || "";
      const { title, description, skills, content, contentText} = req.body;
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

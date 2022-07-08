import { Router, Request, Response, NextFunction } from "express";
import { portfolioService } from "../services/portfolio-service";
// import { contentTypeChecker } from "../utils/content-type-checker";
// import { nanoid } from "nanoid"

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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // contentTypeChecker(req.body);
      // const userId = req.currentId
      const userId = "test";
      // const portId = nanoid();
      const portId = "test1";
      const { title, description, skills, content } = req.body;
      const newPortfolio = await portfolioService.addPortfolio({
        portId,
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // contentTypeChecker(req.body);
      const portId = req.params.portId;
      //const userId = req.cuurentId;
      const userId = "test";
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Content-Type 체크
      // contentTypeChecker(req.body);
      const portId = req.params.portId;
      // const userId = req.currentId;
      const deletedPortfolioInfo = await portfolioService.deletePortfolio(
        portId
      );
      // 상품 삭제 정보 데이터를 JSON 형태로 프론트에 보냄
      res.status(200).json(deletedPortfolioInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { portfolioRouter };

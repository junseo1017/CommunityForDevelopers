import { Router, Request, Response, NextFunction } from "express";
import { portfolioService, userService } from "../services";
import { ExtendReq, loginRequired } from "../middlewares/login-required";
import { upload, getImageUrl } from "../utils/image-util";

const portfolioRouter = Router();

// 1. 전체 포토폴리오 조회
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
// 2. 포토폴리오 조회
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
// 3. 유저별 포토폴리오 조회
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
// 4. 유저별 스크랩 포토폴리오 조회
portfolioRouter.get(
  "/user/:userId/scraps",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      res.status(200).json(await portfolioService.getUserScraps(userId));
    } catch (error) {
      next(error);
    }
  }
);
// 5. 포토폴리오 작성
portfolioRouter.post(
  "/",
  loginRequired,
  upload,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const authorId = req.currentUserId || "";
      const userInfo = await userService.getUserInfo(authorId);
      const author = userInfo.nickname;
      const authorImg = userInfo.imgUrl;
      const { title, description, content, contentText } = req.body;

      console.log("req.body: ", req.body);

      const skills = JSON.parse(req.body.skills);

      const image = req.file;
      const thumbnail = <string>await getImageUrl(<Express.Multer.File>image);

      const newPortfolio = await portfolioService.addPortfolio({
        authorId,
        author,
        authorImg,
        title,
        description,
        skills,
        content,
        contentText,
        thumbnail,
      });

      res.status(201).json(newPortfolio);
    } catch (error) {
      next(error);
    }
  }
);
// 6. 포토폴리오 수정
portfolioRouter.put(
  "/:portId",
  loginRequired,
  upload,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    const portId = req.params.portId;
    const userId = req.currentUserId || "";
    const field = req.query.field as string;
    const adding = req.query.adding === "true";
    try {
      if (field) {
        const updatedPortfolio = await portfolioService.setField(
          portId,
          userId,
          field,
          adding
        );
        res.status(200).json(updatedPortfolio);
      }
      const { title, description, skills, content, contentText } = req.body;
      const image = req.file;
      const thumbnail = <string>await getImageUrl(<Express.Multer.File>image);
      const toUpdate = {
        ...(title && { title }),
        ...(description && { description }),
        ...(skills && { skills }),
        ...(content && { content }),
        ...(contentText && { contentText }),
        ...(thumbnail && { thumbnail }),
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
// 7. 포토폴리오 삭제
portfolioRouter.delete(
  "/:portId",
  loginRequired,
  async (req: ExtendReq, res: Response, next: NextFunction) => {
    try {
      const portId = req.params.portId;
      const userId = req.currentUserId || "";
      const deletedPortfolioInfo = await portfolioService.deletePortfolio(
        portId,
        userId
      );
      res.status(200).json(deletedPortfolioInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { portfolioRouter };

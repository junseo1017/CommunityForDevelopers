import { Types } from "mongoose";
import { portfolioModel, PortfolioModel } from "../db/models/portfolio-model";
import {
  InputDTO,
  UpdateInfo,
  SearchInfo,
} from "../interfaces/portfolio-interface";

class PortfolioService {
  constructor(private portfolioModel: PortfolioModel) {
    this.portfolioModel = portfolioModel;
  }
  async addPortfolio(portInfo: InputDTO) {
    const { author, title, description, skills, content, contentText } =
      portInfo;
    const newPortInfo = {
      author,
      title,
      description,
      skills,
      content,
      contentText,
    };
    return await this.portfolioModel.create(newPortInfo);
  }

  async getPortfolios(lastId?: string) {
    if (lastId) {
      const portfolios = await this.portfolioModel.findPortfolios(lastId);
      if (!portfolios) {
        throw new Error("포토폴리오 목록이 존재하지 않습니다.");
      }
      return portfolios;
    }
    const portfolios = await this.portfolioModel.findPortfoliosInit();
    if (!portfolios) {
      throw new Error("포토폴리오 목록이 존재하지 않습니다.");
    }
    return portfolios;
  }

  async getPortfolio(portId: string) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new Error("포토폴리오가 존재하지 않습니다.");
    }
    return portfolio;
  }

  async getUserPortfolio(userId: string) {
    const portfolio = await this.portfolioModel.findByUserId(userId);
    if (!portfolio) {
      throw new Error("포토폴리오가 존재하지 않습니다.");
    }
    return portfolio;
  }

  async getUserScraps(userId: string) {
    const portfolio = await this.portfolioModel.getScrapsByUserId(userId);
    if (!portfolio) {
      throw new Error("포토폴리오가 존재하지 않습니다.");
    }
    return portfolio;
  }

  async getPortfoliosBySearch(searchInfo: SearchInfo, page: number) {
    const portfolios = await this.portfolioModel.findBySearch(searchInfo, page);
    if (!portfolios) {
      throw new Error("검색과정에서 문제가 발생하였습니다.");
    }
    return portfolios;
  }

  async setPortfolio(portId: string, userId: string, portInfo: UpdateInfo) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new Error("포토폴리오 정보가 없습니다.");
    }
    if (!portfolio.author.equals(userId)) {
      throw new Error("Forbidden");
    }
    return await this.portfolioModel.update(portId, portInfo);
  }

  async setField(
    portId: string,
    userId: string,
    field: string,
    adding: boolean
  ) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new Error("포토폴리오 정보가 없습니다.");
    }
    if (adding) {
      return await this.portfolioModel.addUserInField(portId, userId, field);
    }
    return await this.portfolioModel.deleteUserInField(portId, userId, field);
  }

  async setPortfolioComment(portId: string, commentId: Types.ObjectId) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new Error("포토폴리오 정보가 없습니다.");
    }
    return await this.portfolioModel.updateComment(portId, commentId);
  }
  async deletePortfolio(portId: string, userId: string) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new Error("해당 포토폴리오가 존재하지 않습니다.");
    }
    if (!portfolio.author.equals(userId)) {
      throw new Error("Forbidden");
    }
    return await this.portfolioModel.deleteById(portId);
  }
}

const portfolioService = new PortfolioService(portfolioModel);
export { portfolioService };

import { portfolioModel, PortfolioModel } from "../db/models/portfolio-model";
import { IPortInputDTO, IPort } from "../interfaces/portfolio-interface";
class PortfolioService {
  constructor(private portfolioModel: PortfolioModel) {
    this.portfolioModel = portfolioModel;
  }
  async addPortfolio(portInfo: IPort) {
    const { userId, title, description, skills, content } = portInfo;
    const newPortInfo = { userId, title, description, skills, content };
    return await this.portfolioModel.create(newPortInfo);
  }

  async getPortfolios() {
    const portfolios = await this.portfolioModel.findAll();
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

  async setPortfolio(portId: string, userId: string, portInfo: IPortInputDTO) {
    const portfolio = await this.portfolioModel.findById(portId);
    if (!portfolio) {
      throw new Error("포토폴리오 정보가 없습니다.");
    }
    if (portfolio.userId !== userId) {
      throw new Error("Forrbidden");
    }
    return await this.portfolioModel.update(portId, portInfo);
  }
  async deletePortfolio(portId: string) {
    const deletedportfolio = await this.portfolioModel.deleteById(portId);
    if (!deletedportfolio) {
      throw new Error("해당 포토폴리오가 존재하지 않습니다.");
    }
    return deletedportfolio;
  }
}

const portfolioService = new PortfolioService(portfolioModel);
export { portfolioService };

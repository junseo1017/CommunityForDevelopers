import { model } from "mongoose";
import { PortfolioSchema } from "../schema/portfolio-schema";
import { IPort, IPortInputDTO } from "../../interface/portfolio-interface";

const Portfolio = model("portofolios", PortfolioSchema);

export class PortfolioModel {
  async findById(portId: string) {
    return await Portfolio.findOne({ portId });
  }

  async findAll() {
    return await Portfolio.find({});
  }

  async create(portInfo: IPort) {
    return await Portfolio.create(portInfo);
  }

  async update(portId: string, update: IPortInputDTO) {
    const filter = { portid: portId };
    const option = { returnOriginal: false };

    return await Portfolio.findOneAndUpdate(filter, update, option);
  }

  async deleteById(portId: string) {
    return await Portfolio.findOneAndDelete({ portId });
  }

  async deleteByEmail(email: string) {
    return await Portfolio.findOneAndDelete({ email });
  }
}

const portfolioModel = new PortfolioModel();

export { portfolioModel };

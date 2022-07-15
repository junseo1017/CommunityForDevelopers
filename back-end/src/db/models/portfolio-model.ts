import { model, Types, Document } from "mongoose";
import { PortfolioSchema, PortfolioType } from "../schemas/portfolio-schema";
import { IPort, IPortInputDTO } from "../../interfaces/portfolio-interface";

// const Portfolio = model("portofolios", PortfolioSchema);
const Portfolio = model<PortfolioType & Document>(
  "portofolios",
  PortfolioSchema
);
export class PortfolioModel {
  async findById(portId: string) {
    return await Portfolio.findOne({ _id: portId }).populate([
      {
        path: "author",
        select: "nickname",
      },
      {
        path: "comments",
        populate: {
          path: "author",
          select: "nickname",
        },
      },
    ]);
  }

  async findByUserId(userId: string) {
    return await Portfolio.find({ author: userId }).populate({
      path: "author",
      select: "nickname",
    });
  }

  async findPortfoliosInit() {
    return await Portfolio.find({}).sort({ _id: -1 }).limit(12).populate({
      path: "author",
      select: "nickname",
    });
  }
  async findPortfolios(lastId: string) {
    const id = new Types.ObjectId(lastId);
    return await Portfolio.find({ _id: { $lt: id } })
      .sort({ _id: -1 })
      .limit(12)
      .populate({
        path: "author",
        select: "nickname",
      });
  }
  async findBySearchInit(options: Array<any>, orderBy: string) {
    return await Portfolio.find({ $or: options })
      .sort({ [orderBy]: -1 })
      .populate({
        path: "author",
        select: "nickname",
      });
  }

  async create(portInfo: IPort) {
    return await Portfolio.create(portInfo);
  }

  async update(portId: string, update: IPortInputDTO) {
    const filter = { portId };
    const option = { returnOriginal: false };

    return await Portfolio.findOneAndUpdate(filter, update, option);
  }

  async updateComment(portId: string, commentId: Types.ObjectId) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };

    return await Portfolio.findOneAndUpdate(
      filter,
      { $addToSet: { comments: commentId } },
      option
    );
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

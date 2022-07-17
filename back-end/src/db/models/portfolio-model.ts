import { model, Types, Document } from "mongoose";
import { PortfolioSchema, PortfolioType } from "../schemas/portfolio-schema";
import {
  UpdateInfo,
  InputDTO,
  SearchInfo,
} from "../../interfaces/portfolio-interface";

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

  async getCountByUserId(userId: string) {
    return await Portfolio.find({ author: userId }).count();
  }

  async getScrapsCountByUserId(userId: string) {
    return await Portfolio.find({ scraps: new Types.ObjectId(userId) }).count();
  }

  async getScrapsByUserId(userId: string) {
    return await Portfolio.find({ scraps: new Types.ObjectId(userId) });
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

  async findBySearch(searchInfo: SearchInfo, page: number) {
    return await Portfolio.aggregate([
      {
        $search: {
          index: "searchIndex",
          text: {
            query: searchInfo.value,
            path: searchInfo.options,
          },
        },
      },
      {
        $match: {
          skills: {
            $in: searchInfo.skills,
          },
        },
      },
      { $sort: { [searchInfo.orderBy]: -1 } },
      { $skip: (page - 1) * 12 },
      { $limit: 12 },
    ]);
  }

  async create(portInfo: InputDTO) {
    return await Portfolio.create(portInfo);
  }

  async update(portId: string, update: UpdateInfo) {
    const filter = { portId };
    const option = { returnOriginal: false };

    return await Portfolio.findOneAndUpdate(filter, update, option);
  }

  async addUserInField(portId: string, userId: string, field: string) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };
    return await Portfolio.findOneAndUpdate(
      filter,
      { $addToSet: { [field]: userId } },
      option
    );
  }

  async deleteUserInField(portId: string, userId: string, field: string) {
    const filter = { _id: portId };
    const option = { returnOriginal: false };
    return await Portfolio.findOneAndUpdate(
      filter,
      { $pull: { [field]: userId } },
      option
    );
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

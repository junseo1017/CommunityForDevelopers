import { SearchInfo } from "../interfaces/portfolio-interface";
import { Types } from "mongoose";

function getSearchCondition(searchInfo: SearchInfo, page: number) {
  const condition: Array<any> = [];
  if (searchInfo.value) {
    condition.push({
      $search: {
        index: "searchIndex",
        text: {
          query: searchInfo.value,
          path: searchInfo.options,
        },
      },
    });
  }

  if (searchInfo.skills) {
    const skillList: RegExp[] = [];
    searchInfo.skills.map((skill) => {
      skillList.push(new RegExp(skill, "i"));
    });
    condition.push({
      $match: {
        skills: {
          $in: skillList,
        },
      },
    });
  }
  condition.push(
    { $sort: { [searchInfo.orderBy]: -1 } },
    { $skip: (page - 1) * 12 },
    { $limit: 12 }
  );
  return condition;
}

function qnaSearchCondition(value: string, page: number) {
  const condition: Array<any> = [];
  if (value) {
    condition.push({
      $search: {
        index: "searchQnA",
        text: {
          query: value,
          path: ["title", "contentText"],
        },
      },
    });
  }
  condition.push(
    { $match: { isAnswer: false } },
    { $sort: { _id: -1 } },
    { $skip: (page - 1) * 8 },
    { $limit: 8 }
  );
  return condition;
}

export { getSearchCondition, qnaSearchCondition };

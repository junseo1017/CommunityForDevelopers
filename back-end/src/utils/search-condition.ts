import { SearchInfo } from "../interfaces/portfolio-interface";

function getSearchCondition(searchInfo: SearchInfo, page: number) {
  let condition: Array<any> = [];
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
    condition.push({
      $match: {
        skills: {
          $in: searchInfo.skills,
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

export { getSearchCondition };

import { SearchInfo } from "../interfaces/portfolio-interface";

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

export { getSearchCondition };

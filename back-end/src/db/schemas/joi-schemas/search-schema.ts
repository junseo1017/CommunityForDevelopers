import Joi from "joi";

const searchPortfolioJoi = Joi.object({
  option: Joi.string().empty(""),
  value: Joi.string().min(2).max(20).empty(""),
  orderBy: Joi.string().empty(""),
  skill: Joi.array().items(Joi.string().empty("")).empty(""),
});

const searchQnaJoi = Joi.object({
  value: Joi.string().min(2).max(20).empty(""),
});

export { searchPortfolioJoi, searchQnaJoi };

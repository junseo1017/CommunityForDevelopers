import Joi from "joi";

const portfolioSearchJoi = Joi.object({
  lastId: Joi.string().empty(""),
});

const portfolioCreateJoi = Joi.object({
  title: Joi.string().min(2).max(30).empty(""),
  description: Joi.string().max(100).empty(""),
  skills: Joi.string().empty(""),
  content: Joi.string().empty(""),
  contentText: Joi.string().empty(""),
  imgUrl: Joi.string().empty(""),
});

const portfolioUpdateQueryJoi = Joi.object({
  field: Joi.string().empty(""),
  adding: Joi.string().empty(""),
});

const portfolioUpdateJoi = Joi.object({
  description: Joi.string().max(100).empty(""),
  skills: Joi.string().empty(""),
  content: Joi.string().empty(""),
  contentText: Joi.string().empty(""),
  imgUrl: Joi.string().empty(""),
});

export {
  portfolioSearchJoi,
  portfolioCreateJoi,
  portfolioUpdateQueryJoi,
  portfolioUpdateJoi,
};

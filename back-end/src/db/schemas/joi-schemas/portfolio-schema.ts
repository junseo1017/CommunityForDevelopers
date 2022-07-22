import Joi from "joi";

const portfolioSearchJoi = Joi.object({
  lastId: Joi.string().empty(""),
});

const portfolioCreateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100),
  skills: Joi.string().empty(""),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string().empty(""),
});

const portfolioUpdateQueryJoi = Joi.object({
  field: Joi.string().empty(""),
  adding: Joi.string().empty(""),
});

const portfolioUpdateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100),
  skills: Joi.string().empty(""),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string().empty(""),
});

export {
  portfolioSearchJoi,
  portfolioCreateJoi,
  portfolioUpdateQueryJoi,
  portfolioUpdateJoi,
};

import Joi from "joi";

const portfolioSearchJoi = Joi.object({
  lastId: Joi.string(),
});

const portfolioCreateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100),
  skills: Joi.string(),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string(),
});

const portfolioUpdateQueryJoi = Joi.object({
  field: Joi.string(),
  adding: Joi.string(),
});

const portfolioUpdateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100),
  skills: Joi.string(),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string(),
});

export {
  portfolioSearchJoi,
  portfolioCreateJoi,
  portfolioUpdateQueryJoi,
  portfolioUpdateJoi,
};

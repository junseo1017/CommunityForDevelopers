import Joi from "joi";

const portfolioSearchJoi = Joi.object({
  lastId: Joi.string().min(0),
});

const portfolioCreateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100),
  skills: Joi.string().min(0),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string().min(0),
});

const portfolioUpdateQueryJoi = Joi.object({
  field: Joi.string().min(0),
  adding: Joi.string().min(0),
});

const portfolioUpdateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100),
  skills: Joi.string().min(0),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string().min(0),
});

export {
  portfolioSearchJoi,
  portfolioCreateJoi,
  portfolioUpdateQueryJoi,
  portfolioUpdateJoi,
};

import Joi from "joi";

const portfolioSearchJoi = Joi.object({
  lastId: Joi.string(),
});

const portfolioCreateJoi = Joi.object({
  authorId: Joi.string().required(),
  author: Joi.string().required(),
  authorImg: Joi.string(),
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100).required(),
  skills: Joi.array().items(Joi.string().required()),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string(),
});

const portfolioUpdateQueryJoi = Joi.object({
  field: Joi.string(),
  adding: Joi.string(),
});

const portfolioUpdateJoi = Joi.object({
  authorId: Joi.string().required(),
  author: Joi.string().required(),
  authorImg: Joi.string(),
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100).required(),
  skills: Joi.array().items(Joi.string().required()),
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

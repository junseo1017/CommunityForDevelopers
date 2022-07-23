import Joi from "joi";

const portfolioSearchJoi = Joi.object({
  lastId: Joi.string().allow("", null),
});

const portfolioCreateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100).required(),
  skills: Joi.string().required(),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string().required(),
});

const portfolioUpdateQueryJoi = Joi.object({
  field: Joi.string().empty("").optional(),
  adding: Joi.string().empty("").optional(),
});

const portfolioUpdateJoi = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100).required(),
  skills: Joi.string().required(),
  content: Joi.string().required(),
  contentText: Joi.string().required(),
  imgUrl: Joi.string().required(),
});

export {
  portfolioSearchJoi,
  portfolioCreateJoi,
  portfolioUpdateQueryJoi,
  portfolioUpdateJoi,
};

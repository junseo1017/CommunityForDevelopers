import Joi from "joi";

const portfolioJoiSchema = Joi.object({
  author: Joi.string().required(),
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().max(100).required(),
  skills: Joi.array().items(Joi.string().required()),
  content: Joi.string().required(),
});

export { portfolioJoiSchema };

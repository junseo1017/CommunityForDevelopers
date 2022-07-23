import Joi from "joi";

const commentInputJoi = Joi.object({
  content: Joi.string().required(),
});

const commentDeleteJoi = Joi.object({
  portId: Joi.string().required(),
});

export { commentInputJoi, commentDeleteJoi };

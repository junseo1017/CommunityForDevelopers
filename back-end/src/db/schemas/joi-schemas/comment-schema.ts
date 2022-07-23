import Joi from "joi";

const commentInputJoi = Joi.object({
  content: Joi.string().required(),
});

const commentDeleteJoi = Joi.object({
  portId: Joi.string().optional(),
  qnaId: Joi.string().optional(),
});

export { commentInputJoi, commentDeleteJoi };

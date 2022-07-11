import Joi from "joi";

const userJoiSchema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(15).required(),
});

export { userJoiSchema };

import Joi from "joi";

const userJoiSchema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string()
    .pattern(new RegExp("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i"))
    .required(),
  password: Joi.string()
    .pattern(new RegExp("/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,15}$/"))
    .required(),
});

export { userJoiSchema };

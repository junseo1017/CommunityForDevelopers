import Joi from "joi";

const userCreateJoiSchema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string()
    .pattern(
      new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
      )
    )
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/))
    .required(),
});

const userUpdateJoiSchema = Joi.object({
  nickname: Joi.string().required(),
});

export { userCreateJoiSchema, userUpdateJoiSchema };

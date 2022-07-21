import Joi from "joi";

const userCreateJoiSchema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/
      )
    )
    .required(),
});

const userUpdateJoiSchema = Joi.object({
  nickname: Joi.string(),
  job: Joi.string(),
  skills: Joi.string(),
});

export { userCreateJoiSchema, userUpdateJoiSchema };

import Joi from "joi";

const register = Joi.object({
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

const updateUser = Joi.object({
  nickname: Joi.string().required(),
});

export { register, updateUser };

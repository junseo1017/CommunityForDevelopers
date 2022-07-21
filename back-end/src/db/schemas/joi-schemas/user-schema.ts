import Joi from "joi";

const userRegisterJoi = Joi.object({
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

const userLoginJoi = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/
      )
    )
    .required(),
});

const userEmailJoi = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  authNumber: Joi.number(),
});

const userUpdateInfoJoi = Joi.object({
  nickname: Joi.string().required(),
  job: Joi.string(),
  skills: Joi.string(),
  imgUrl: Joi.string(),
});

const userUpdatePWJoi = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/
      )
    )
    .required(),
});

export {
  userRegisterJoi,
  userLoginJoi,
  userEmailJoi,
  userUpdateInfoJoi,
  userUpdatePWJoi,
};

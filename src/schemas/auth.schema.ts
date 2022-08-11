import Joi from 'joi'

const RegisterUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
})

const SignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required()
})

export { RegisterUser, SignIn }

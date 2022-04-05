import Joi from 'joi';

const email = Joi.string().email().required();
const password = Joi.string().min(6).max(30).required();

export const UserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email,
  password,
});

export const UserLoginSchema = Joi.object().keys({
  email,
  password,
});

export const UpdateUserSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
}).unknown(true);

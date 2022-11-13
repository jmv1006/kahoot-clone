import Joi from 'joi';

const newUserSchema = Joi.object({
   username: Joi.string().min(3).max(36).required(),
   email: Joi.string().min(3).max(64).email().required(),
   password: Joi.string().min(8).max(64).required(),
   confirmedPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export default newUserSchema;

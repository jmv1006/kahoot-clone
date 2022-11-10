import Joi from "joi";

const newGameSchema = Joi.object({
  creatorId: Joi.string().required(),
  title: Joi.string().min(3).max(64).required(),
});

export default newGameSchema;

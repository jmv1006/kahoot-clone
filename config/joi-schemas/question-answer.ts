import Joi from 'joi';

const NewQuestionSchema = Joi.object({
  gameId: Joi.string().required(),
  questions: Joi.array().items({
    text: Joi.string().min(3).max(255).required(),
    gameId: Joi.string().required(),
    answers: Joi.array().items({
      text: Joi.string().min(1).max(255).required(),
      isCorrect: Joi.boolean().required(),
      gameId: Joi.string().required(),
      questionId: Joi.required(),
    }),
  }),
});

export default NewQuestionSchema;

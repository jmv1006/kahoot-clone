import Joi from 'joi';

const NewQuestionSchema = Joi.object({
  game_id: Joi.string().required(),
  questions: Joi.array().items({
    text: Joi.string().min(3).max(255).required(),
    game_id: Joi.string().required(),
    answers: Joi.array().items({
      text: Joi.string().min(1).max(255).required(),
      isCorrect: Joi.boolean().required(),
      game_id: Joi.string().required(),
    }),
  }),
});

const UpdateQuestionsSchema = Joi.object({
  game_id: Joi.string().required(),
  questions: Joi.array().items({
    id: Joi.string().allow(null),
    text: Joi.string().min(3).max(255).required(),
    game_id: Joi.string().required(),
    answers: Joi.array().items({
      id: Joi.string().allow(null),
      text: Joi.string().min(1).max(255).required(),
      question_id: Joi.string().min(1).max(255),
      isCorrect: Joi.boolean().required(),
      game_id: Joi.string().required(),
    }),
  }),
});

export { NewQuestionSchema, UpdateQuestionsSchema };

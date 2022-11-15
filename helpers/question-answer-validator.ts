interface AnswerRequestObj {
  text: string;
  isCorrect: boolean;
  gameId: string;
  questionId: string | null;
}

const QuestionAnswerValidator = (answers: Array<AnswerRequestObj>) => {
  let isCorrect = false;

  answers.forEach((answer: AnswerRequestObj) => {
    if (isCorrect && answer.isCorrect) return false;
    if (!isCorrect) isCorrect = true;
  });

  if (!isCorrect) return false;
  return true;
};

export default QuestionAnswerValidator;

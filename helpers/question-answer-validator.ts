interface AnswerRequestObj {
  text: string;
  isCorrect: boolean;
  gameId: string;
  questionId: string | null;
}

const QuestionAnswerValidator = (answers: Array<AnswerRequestObj>) => {
  let isCorrect = false;
  const answerTexts = new Set();

  answers.forEach((answer: AnswerRequestObj) => {
    if (isCorrect && answer.isCorrect) return false;
    if (!isCorrect) isCorrect = true;
    //duplicate answers
    if (answerTexts.has(answer.text.toUpperCase())) return false;

    answerTexts.add(answer.text.toUpperCase());
  });

  if (!isCorrect) return false;
  return true;
};

export default QuestionAnswerValidator;

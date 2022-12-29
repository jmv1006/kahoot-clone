interface AnswerRequestObj {
  text: string;
  isCorrect: boolean;
  game_id: string;
}

// checks to see if given answer set has at least one true answer
const QuestionAnswerValidator = (answers: Array<AnswerRequestObj>) : boolean => {
  let isCorrect = false;
  const answerTexts = new Set();

  answers.forEach((answer: AnswerRequestObj) => {
    if (answer.isCorrect) isCorrect = true;
    if (answerTexts.has(answer.text.toUpperCase())) return false;
    answerTexts.add(answer.text.toUpperCase());
  });

  if (!isCorrect) return false;
  return true;
};



export default QuestionAnswerValidator;

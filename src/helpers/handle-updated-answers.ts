import { UpdatedAnswer } from "../config/interfaces/updated-question-answer";
import client from "../config/prisma";
import QuestionAnswerValidator from "./question-answer-validator";

const handleUpdatedAnswers = async (answersToBeUpdatedOrAdded : Array<UpdatedAnswer>, existingQuestionId: string) : Promise<boolean> => {
    const existingAnswers = await client.answers.findMany({where: {question_id: existingQuestionId}});
    const res: Array<UpdatedAnswer> = [];
    res.concat(existingAnswers);

    answersToBeUpdatedOrAdded.forEach((updatedAnswer: UpdatedAnswer) => {
        // if replacing an existing answer
        if(res.some((answer: UpdatedAnswer) => answer.id == updatedAnswer.id)) {
            res.forEach((existingAnswer : UpdatedAnswer) => {
                const index = res.findIndex((answerToBeSwapped : UpdatedAnswer) => answerToBeSwapped.id == existingAnswer.id);
                if(index >= 0) res[index] = updatedAnswer;
            })
        } else {
            //answer is new
            res.push(updatedAnswer);
        }
    });

    return QuestionAnswerValidator(res.map((answerObject: UpdatedAnswer) => {return {game_id: answerObject.game_id, isCorrect: answerObject.isCorrect, text: answerObject.text}}));
}

export default handleUpdatedAnswers;
interface Answer {
   id: string | null;
   text: string;
   isCorrect: boolean;
   gameId: string;
   questionId: string;
}

export default Answer;

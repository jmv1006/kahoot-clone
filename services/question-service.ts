interface Question {
   id: string | null;
   gameId: string;
   text: string;
   numAnswers: string | number;
}

class QuestionService {
   private static instance: QuestionService;

   public static getInstance(): QuestionService {
      if (!this.instance) {
         QuestionService.instance = new QuestionService();
      }
      return this.instance;
   }

   getQuestion(id: string) {
      const question = id; // check if question exists in db
      const answers: Array<any> = []; // get answers where answer.id === question.id

      return { question, answers };
   }
}

export default QuestionService;

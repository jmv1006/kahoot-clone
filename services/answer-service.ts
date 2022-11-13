interface Answer {
   id: string | null;
   questionId: string;
   text: string;
   isCorrect: boolean;
}

class AnswerService {
   private static instance: AnswerService;

   public static getInstance(): AnswerService {
      if (!this.instance) {
         AnswerService.instance = new AnswerService();
      }
      return this.instance;
   }

   createAnswer(answer: Answer) {
      const questionExists = true; //check if question exists in db
   }
}

export default AnswerService;

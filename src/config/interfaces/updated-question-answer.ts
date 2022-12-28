interface UpdatedAnswer {
  id: string | null;
  text: string;
  isCorrect: boolean;
  game_id: string;
}

interface UpdatedQuestion {
  id: string | null;
  text: string;
  game_id: string;
  answers: Array<UpdatedAnswer>;
}

export { UpdatedQuestion, UpdatedAnswer };

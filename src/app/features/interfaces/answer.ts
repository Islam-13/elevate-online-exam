export interface Answer {
  question: string;
  allAnswers: Answers[];
  correctAnswer: string;
  choosedAnswer: string;
  isCorrect: number;
  isAnswered: number;
}

interface Answers {
  answer: string;
  key: string;
}

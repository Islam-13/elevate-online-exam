import { Exam } from './exam';
import { Quiz } from './quizzes';

export interface QuestionsRes {
  message: string;
  questions: Question[];
}

export interface Question {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Quiz;
  exam: Exam;
  createdAt: string;
}

interface Answer {
  answer: string;
  key: string;
}

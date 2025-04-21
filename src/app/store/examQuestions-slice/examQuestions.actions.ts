import { createAction, props } from '@ngrx/store';
import { Question } from '../../features/interfaces/questions';

export const getData = createAction(
  '[examQuestions] getData',
  props<{ value: Question[] }>()
);

export const startQuiz = createAction('[examQuestions] startQuiz');

export const answerQ = createAction(
  '[examQuestions] answerQ',
  props<{
    question: string;
    allAnswers: {}[];
    correctAnswer: string;
    choosedAnswer: string;
    isCorrect: number;
    isAnswered: number;
  }>()
);

export const nextQ = createAction('[examQuestions] nextQ');

export const prevQ = createAction('[examQuestions] prevQ');

export const moveQ = createAction(
  '[examQuestions] moveQ',
  props<{ value: number }>()
);

export const finishQ = createAction('[examQuestions] finishQ');

export const showResults = createAction('[examQuestions] showResults');

export const resetQ = createAction('[examQuestions] resetQ');

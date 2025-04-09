import { createReducer, on } from '@ngrx/store';
import { Question } from '../../features/interfaces/questions';
import * as actions from './examQuestions.actions';

interface State {
  questions: Question[];
  answers: {}[];
  numQuestions: number;
  status: string;
  currentQ: number;
  score: number;
  duration: number;
}

const initialState: State = {
  questions: [],
  answers: [],
  numQuestions: 0,
  status: 'loading',
  currentQ: 0,
  score: 0,
  duration: 0,
};

export const examQuestionsReducer = createReducer(
  initialState,
  on(actions.getData, (state, { value }) => ({
    ...state,
    questions: value,
    answers: Array(value.length).fill({ choosedAnswer: '', correct: 0 }),
    numQuestions: value.length,
    status: 'ready',
    duration: value[0].exam.duration * 60,
  })),

  on(actions.startQuiz, (state) => ({ ...state, status: 'active' })),

  on(actions.answerQ, (state, action) => {
    const updatedAnswers = [...state.answers];
    updatedAnswers[state.currentQ] = action;

    return { ...state, answers: updatedAnswers };
  }),

  on(actions.nextQ, (state) => ({ ...state, currentQ: state.currentQ + 1 })),

  on(actions.prevQ, (state) => ({ ...state, currentQ: state.currentQ - 1 })),

  on(actions.moveQ, (state, { value }) => ({ ...state, currentQ: value })),

  on(actions.finishQ, (state) => ({ ...state, status: 'finished' })),

  on(actions.resetQ, () => ({
    questions: [],
    answers: [],
    numQuestions: 0,
    status: 'loading',
    currentQ: 0,
    score: 0,
    duration: 0,
  }))
);

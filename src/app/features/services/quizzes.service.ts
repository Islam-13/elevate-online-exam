import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { env } from '../../env/env.dev';
import { ExamRes } from '../interfaces/exam';
import { QuizzesRes } from '../interfaces/quizzes';
import { QuestionsRes } from '../interfaces/questions';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  private readonly _http = inject(HttpClient);
  private readonly _baseURL = env.baseURL;

  getQuizzes() {
    return this._http.get<QuizzesRes>(`${this._baseURL}/subjects?limit=6`).pipe(
      map((res) => res.subjects),
      catchError((err) =>
        throwError(
          () =>
            new Error(
              'Something went wrong fetching quizes, please try again later.'
            )
        )
      )
    );
  }

  getAllQuizzes() {
    return this._http.get<QuizzesRes>(`${this._baseURL}/subjects`).pipe(
      map((res) => res.subjects),
      catchError((err) =>
        throwError(
          () =>
            new Error(
              'Something went wrong fetching quizes, please try again later.'
            )
        )
      )
    );
  }

  getExamsOfQuiz(id: string) {
    return this._http.get<ExamRes>(`${this._baseURL}/exams?subject=${id}`).pipe(
      map((res) => res.exams),
      catchError((err) =>
        throwError(
          () =>
            new Error(
              'Something went wrong fetching exams, please try again later.'
            )
        )
      )
    );
  }

  getQuestionsOfExam(examId: string) {
    return this._http
      .get<QuestionsRes>(`${this._baseURL}/questions?exam=${examId}`)
      .pipe(
        map((res) => res.questions),
        catchError((err) =>
          throwError(
            () =>
              new Error(
                'Something went wrong fetching questions, please try again later.'
              )
          )
        )
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { QuizzesRes } from '../interfaces/quizzes';
import { ExamRes } from '../interfaces/exam';
import { QuestionsRes } from '../interfaces/questions';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  private _http = inject(HttpClient);

  getQuizzes() {
    return this._http
      .get<QuizzesRes>('https://exam.elevateegy.com/api/v1/subjects?limit=6', {
        headers: { token: localStorage.getItem('loggedToken')! },
      })
      .pipe(
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
    return this._http
      .get<QuizzesRes>('https://exam.elevateegy.com/api/v1/subjects', {
        headers: { token: localStorage.getItem('loggedToken')! },
      })
      .pipe(
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
    return this._http
      .get<ExamRes>(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`, {
        headers: { token: localStorage.getItem('loggedToken')! },
      })
      .pipe(
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
      .get<QuestionsRes>(
        `https://exam.elevateegy.com/api/v1/questions?exam=${examId}`,
        {
          headers: { token: localStorage.getItem('loggedToken')! },
        }
      )
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

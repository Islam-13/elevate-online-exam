import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { callingApi, callingApiEnd } from '@loadStore/isLoading.actions';
import { QuizCardComponent } from '../quiz-card/quiz-card.component';
import { QuizzesService } from '../../../services/quizzes.service';
import { Quiz } from '../../../interfaces/quizzes';

@Component({
  selector: 'app-quizzes',
  imports: [QuizCardComponent],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss',
})
export class QuizzesComponent implements OnInit {
  quizes = signal<Quiz[]>([]);
  error = signal<string>('');

  private _quizzes = inject(QuizzesService);
  private _destroyRef = inject(DestroyRef);
  private _store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch(callingApi());
    this.error.set('');

    const subscrition = this._quizzes.getQuizzes().subscribe({
      next: (res) => this.quizes.set(res),
      error: (err) => this.error.set(err.message),
      complete: () => this._store.dispatch(callingApiEnd()),
    });

    this._destroyRef.onDestroy(() => subscrition.unsubscribe());
  }

  onGetAllQuizzes() {
    this._store.dispatch(callingApi());
    this.error.set('');

    const subscrition = this._quizzes.getAllQuizzes().subscribe({
      next: (res) => this.quizes.set(res),
      error: (err) => this.error.set(err.message),
      complete: () => this._store.dispatch(callingApiEnd()),
    });

    this._destroyRef.onDestroy(() => subscrition.unsubscribe());
  }
}

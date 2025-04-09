import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { startQuiz } from '../../../../store/examQuestions-slice/examQuestions.actions';

@Component({
  selector: 'app-exam-instructions',
  templateUrl: './exam-instructions.component.html',
  styleUrl: './exam-instructions.component.scss',
})
export class ExamInstructionsComponent implements OnInit {
  status = signal<string>('');

  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._store.select('examQuestions').subscribe({
      next: ({ status }) => this.status.set(status),
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onStart() {
    this._store.dispatch(startQuiz());
  }
}

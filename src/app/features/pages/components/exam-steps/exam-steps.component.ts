import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { ExamInstructionsComponent } from '../exam-instructions/exam-instructions.component';
import { ExamQuestionComponent } from '../exam-question/exam-question.component';
import { ExamScoreComponent } from '../exam-score/exam-score.component';

@Component({
  selector: 'app-exam-steps',
  imports: [
    ExamInstructionsComponent,
    ExamQuestionComponent,
    ExamScoreComponent,
  ],
  templateUrl: './exam-steps.component.html',
  styleUrl: './exam-steps.component.scss',
})
export class ExamStepsComponent implements OnInit {
  status = signal<string>('loading');

  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._store.select('examQuestions').subscribe({
      next: ({ status }) => this.status.set(status),
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

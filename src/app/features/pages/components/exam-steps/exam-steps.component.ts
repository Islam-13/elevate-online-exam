import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ExamInstructionsComponent } from '../exam-instructions/exam-instructions.component';
import { ExamQuestionComponent } from '../exam-question/exam-question.component';
import { ExamScoreComponent } from '../exam-score/exam-score.component';
import { ExamResultsComponent } from '../exam-results/exam-results.component';

@Component({
  selector: 'app-exam-steps',
  imports: [
    ExamInstructionsComponent,
    ExamQuestionComponent,
    ExamScoreComponent,
    ExamResultsComponent,
  ],
  templateUrl: './exam-steps.component.html',
  styleUrl: './exam-steps.component.scss',
})
export class ExamStepsComponent implements OnInit {
  status = signal<string>('loading');
  closeModal = output();

  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._store.select('examQuestions').subscribe({
      next: ({ status }) => this.status.set(status),
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}

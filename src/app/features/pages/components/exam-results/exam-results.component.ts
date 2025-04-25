import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { resetQ } from '@examStore/examQuestions.actions';
import { Answer } from '../../../interfaces/answer';

@Component({
  selector: 'app-exam-results',
  templateUrl: './exam-results.component.html',
  styleUrl: './exam-results.component.scss',
})
export class ExamResultsComponent implements OnInit {
  questions = signal<Answer[]>([]);
  closeModal = output();

  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._store.select('examQuestions').subscribe({
      next: ({ answers }) => {
        const wrongAnswers = answers.filter((i: any) => i.isCorrect == 0);

        this.questions.set(wrongAnswers);
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClose() {
    this.closeModal.emit();
    this._store.dispatch(resetQ());
  }
}

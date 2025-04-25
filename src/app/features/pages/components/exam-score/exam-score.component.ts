import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { resetQ, showResults } from '@examStore/examQuestions.actions';

@Component({
  selector: 'app-exam-score',
  templateUrl: './exam-score.component.html',
  styleUrl: './exam-score.component.scss',
})
export class ExamScoreComponent implements OnInit {
  correctAnswers = signal<number>(0);
  incorrectAnswers = signal<number>(0);
  percentage = signal<number>(0);
  chart = signal<string>('');
  closeModal = output();

  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._store.select('examQuestions').subscribe({
      next: ({ answers, numQuestions }) => {
        const correct = answers.reduce(
          (acc: any, curr: any) => acc + curr.isCorrect,
          0
        );

        this.correctAnswers.set(correct);
        this.incorrectAnswers.set(numQuestions - correct);

        const percentage = Math.round((correct / numQuestions) * 100);

        this.percentage.set(percentage);
        this.chart.set(`--correct: ${percentage}%`);
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onBack() {
    this.closeModal.emit();
    this._store.dispatch(resetQ());
  }

  onShowResults() {
    this._store.dispatch(showResults());
  }
}

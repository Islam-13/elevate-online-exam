import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../../../../store/examQuestions-slice/examQuestions.actions';
import { Question } from '../../../interfaces/questions';
import { TimerPipe } from '../../../../shared/utils/timer.pipe';

@Component({
  selector: 'app-exam-question',
  imports: [TimerPipe],
  templateUrl: './exam-question.component.html',
  styleUrl: './exam-question.component.scss',
})
export class ExamQuestionComponent implements OnInit, OnDestroy {
  currentQ = signal<number>(0);
  question = signal<Question | undefined>(undefined);
  duration = signal<number>(0);
  totalTime = signal<number>(0);
  numQuestions = signal<number>(0);
  hasAnswered = signal<string>('');
  warningTimer = signal<number>(11);

  timerId: any;

  private _store = inject(Store);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this._store.select('examQuestions').subscribe({
      next: ({ questions, answers, currentQ, numQuestions, duration }) => {
        this.currentQ.set(currentQ);
        this.numQuestions.set(numQuestions);
        this.question.set(questions.at(currentQ));
        this.hasAnswered.set(answers[currentQ].choosedAnswer);
        this.totalTime.set(duration);
        this.duration() === 0 ? this.duration.set(duration) : null;
      },
    });

    this.startTimer();

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  startTimer() {
    this.timerId = interval(1000)
      .pipe(
        map((val) => {
          this.duration() - val - 1;
          this.warningTimer.set((this.duration() / this.totalTime()) * 100);
        })
      )
      .subscribe(() => {
        this.duration.update((c) => c - 1);
        this.duration() === 0 ? this.onFinish() : null;
      });
  }

  onAnswer() {
    if (this.hasAnswered() === this.question()?.correct) {
      this._store.dispatch(
        Actions.answerQ({ choosedAnswer: this.hasAnswered(), correct: 1 })
      );
    } else
      this._store.dispatch(
        Actions.answerQ({ choosedAnswer: this.hasAnswered(), correct: 0 })
      );
  }

  onNext() {
    if (this.currentQ() === this.numQuestions() - 1) return;

    this.onAnswer();
    this._store.dispatch(Actions.nextQ());
  }

  onBack() {
    if (this.currentQ() === 0) return;

    this._store.dispatch(Actions.prevQ());
  }

  onSelectAnswer(key: string) {
    this.hasAnswered.set(key);
  }

  moveQ(index: number) {
    this._store.dispatch(Actions.moveQ({ value: index }));
  }

  onFinish() {
    this.onAnswer();
    this._store.dispatch(Actions.finishQ());
  }

  ngOnDestroy(): void {
    this.timerId.unsubscribe();
  }
}

import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { callingApi, callingApiEnd } from '@loadStore/isLoading.actions';
import { Exam } from '../../interfaces/exam';
import { QuizzesService } from '../../services/quizzes.service';
import { ExamItemComponent } from '../components/exam-item/exam-item.component';
import { ErrMessageComponent } from '@shared/ui/err-message/err-message.component';

@Component({
  selector: 'app-exams',
  imports: [ExamItemComponent, ErrMessageComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  quizId = input.required<string>();
  error = signal<string>('');
  exams = signal<Exam[]>([]);

  private _store = inject(Store);
  private _quizzes = inject(QuizzesService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._store.dispatch(callingApi());
    this.error.set('');

    const subscrition = this._quizzes.getExamsOfQuiz(this.quizId()).subscribe({
      next: (res) => this.exams.set(res),
      error: (err) => this.error.set(err.message),
      complete: () => this._store.dispatch(callingApiEnd()),
    });

    this._destroyRef.onDestroy(() => subscrition.unsubscribe());
  }
}

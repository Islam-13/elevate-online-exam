import {
  Component,
  DestroyRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ExamStepsComponent } from '../exam-steps/exam-steps.component';
import { QuizzesService } from '../../../services/quizzes.service';
import { getData } from '@examStore/examQuestions.actions';
import { ModalComponent } from '@shared/ui/modal/modal.component';
import { ErrMessageComponent } from '@shared/ui/err-message/err-message.component';

@Component({
  selector: 'app-exam-item',
  imports: [ModalComponent, ExamStepsComponent, ErrMessageComponent],
  templateUrl: './exam-item.component.html',
  styleUrl: './exam-item.component.scss',
})
export class ExamItemComponent {
  noData = signal<string>('');
  error = signal<string>('');

  id = input.required<string>();
  title = input.required<string>();
  minutes = input.required<number>();
  questionsNum = input.required<number>();

  modal = viewChild<ModalComponent>('dialog');

  private _destroyRef = inject(DestroyRef);
  private _quizzes = inject(QuizzesService);
  private _store = inject(Store);

  onStart() {
    const subscription = this._quizzes.getQuestionsOfExam(this.id()).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this._store.dispatch(getData({ value: res }));
        } else
          this.noData.set(
            `There're no questions at the moment, Please try again later!`
          );
      },
      error: (err) => this.error.set(err.message),
    });

    this.modal()?.openModal();

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onCloseModal() {
    this.modal()?.closeModal();
  }
}

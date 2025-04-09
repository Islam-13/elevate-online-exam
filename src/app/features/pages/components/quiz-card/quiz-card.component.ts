import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  imports: [RouterLink],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  title = input.required<string>();
  image = input.required<string>();
  id = input.required<string>();
}

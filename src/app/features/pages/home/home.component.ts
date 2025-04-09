import { Component } from '@angular/core';
import { QuizzesComponent } from '../components/quizzes/quizzes.component';

@Component({
  selector: 'app-home',
  imports: [QuizzesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

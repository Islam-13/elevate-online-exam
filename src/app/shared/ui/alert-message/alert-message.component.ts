import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss',
})
export class AlertMessageComponent {
  type = input.required<string>();
  message = input.required<string>();
}

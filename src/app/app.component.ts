import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertMessageComponent } from './shared/ui/alert-message/alert-message.component';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'elevate-online-exam';

  _toast = inject(ToastService);
}

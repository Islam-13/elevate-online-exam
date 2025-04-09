import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ctrl-err',
  imports: [],
  templateUrl: './ctrl-err.component.html',
  styleUrl: './ctrl-err.component.scss',
})
export class CtrlErrComponent {
  text = input.required<string>();
}

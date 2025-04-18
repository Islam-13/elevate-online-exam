import { Component, inject, signal } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SearchComponent } from '../../shared/ui/search/search.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  isOpen = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  private _store = inject(Store);

  constructor() {
    this._store.select('isLoading').subscribe({
      next: (val) => this.isLoading.set(val),
    });
  }

  private _router = inject(Router);

  toggleMenu() {
    this.isOpen.update((i) => !i);
  }

  closeMenu() {
    this.isOpen.set(false);
  }

  onLogOuut() {
    localStorage.removeItem('loggedToken');
    this._router.navigate(['/auth/login']);
  }
}

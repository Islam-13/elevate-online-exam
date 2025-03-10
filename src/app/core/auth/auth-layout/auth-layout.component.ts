import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthHeadingComponent } from '../components/auth-heading/auth-heading.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthHeadingComponent, RouterLink],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  icons = [
    { name: 'google', src: 'icons/Google.svg', href: 'https://www.google.com' },
    { name: 'x', src: 'icons/X.svg', href: 'https://www.x.com' },
    {
      name: 'facebook',
      src: 'icons/Facebook.svg',
      href: 'https://www.facebook.com',
    },
    { name: 'apple', src: 'icons/Apple.svg', href: 'https://www.apple.com' },
  ];
}

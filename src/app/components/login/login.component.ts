import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

export interface User {
  displayName?: string;
  photoURL?: string;
  uid?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authServ = inject(AuthService);
  private router = inject(Router);

  isError = signal(false);

  login() {
    this.authServ
      .loginGoogle()
      .then((res) => {
        this.isError.set(false);

        const user: User = {
          displayName: res.user.displayName ?? 'user',
          photoURL: res.user.photoURL ?? undefined,
          uid: res.user.uid,
        };

        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['chat']);
      })
      .catch((err) => {
        this.isError.set(true);
      });
  }
}

import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from '../loader/loader.component';
import { Router } from '@angular/router';

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
    this.authServ.loginGoogle().subscribe({
      next: () => {
        this.isError.set(false);
        this.router.navigate(['chat']);
      },
      error: (err) => {
        this.isError.set(true);
      },
    });
  }

}

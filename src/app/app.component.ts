import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'loginChat';
  authServ = inject(AuthService);

  ngOnInit(): void {
    this.authServ.user$.subscribe({
      next: (data) => {
        if (data) {
          this.authServ.currentUser.set({
            displayName: data.displayName!,
            photoURL: data.photoURL!,
          });
        } else {
          this.authServ.currentUser.set(null);
        }
      },
      error: (err) => {},
    });
  }
}

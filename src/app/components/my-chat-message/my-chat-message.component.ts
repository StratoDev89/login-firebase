import { Component, Input, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-chat-message',
  standalone: true,
  imports: [],
  templateUrl: './my-chat-message.component.html',
  styleUrl: './my-chat-message.component.scss',
})
export class MyChatMessageComponent {
  @Input({ required: true }) text!: string;
  photoURL = signal<string | null>(null);
  authServ = inject(AuthService);

  ngOnInit(): void {
    const user = this.authServ.currentUser();

    if (user?.photoURL) {
      this.photoURL.set(user.photoURL);
    }
  }
}

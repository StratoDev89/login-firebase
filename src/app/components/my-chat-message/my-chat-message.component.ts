import { Component, Input, signal } from '@angular/core';
import { User } from '../login/login.component';

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

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      const { photoURL } = JSON.parse(user) as User;
      this.photoURL.set(photoURL ? photoURL : null);
    }
  }
}

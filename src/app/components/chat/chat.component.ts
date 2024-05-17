import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { MyChatMessageComponent } from '../my-chat-message/my-chat-message.component';
import { LoaderComponent } from '../loader/loader.component';
import {
  TextBoxComponent,
  textMessageEvent,
} from '../text-box/text-box.component';
import { AuthService, User } from '../../services/auth.service';

export interface Message {
  text: string;
  isGpt: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyChatMessageComponent,
    LoaderComponent,
    TextBoxComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  user: User | null | undefined = null;
  isLoading = signal(false);
  messages = signal<Message[]>([]);
  authServ = inject(AuthService);

  @ViewChild('chatContainer', { static: true })
  private chatContainer!: ElementRef;

  ngOnInit(): void {
    this.user = this.authServ.currentUser();
    this.addFirstMessage();
  }

  scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }

  onMessage(event: textMessageEvent) {
    const { prompt, file } = event;
    const newUserMessage: Message = { text: prompt, isGpt: false };
    this.messages.update((prev) => [...prev, newUserMessage]);

    this.scrollToBottom();
  }

  addFirstMessage() {
    const message = {
      text: `Hola ${this.user?.displayName}, ¿En qué puedo ayudarte?`,
      isGpt: true,
    };

    this.messages.update((prev) => [...prev, message]);
  }

  ngOnDestroy(): void {
    this.authServ.logoutGoogle();
  }
}

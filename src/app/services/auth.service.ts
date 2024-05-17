import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  user,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';

export interface User {
  displayName: string;
  photoURL?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUser = signal<User | null | undefined>(undefined);

  loginGoogle() {
    const promise = signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
    return from(promise)
  }

  logoutGoogle() {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}

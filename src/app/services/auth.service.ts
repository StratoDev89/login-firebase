import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}

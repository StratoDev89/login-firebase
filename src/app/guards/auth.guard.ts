import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServ = inject(AuthService);

  if (!authServ.currentUser()) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

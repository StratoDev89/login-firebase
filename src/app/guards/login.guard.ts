import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServ = inject(AuthService);

  if (authServ.currentUser()) {
    router.navigate(['chat']);
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './storage.service';

export const authGuard = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/user/login');
};
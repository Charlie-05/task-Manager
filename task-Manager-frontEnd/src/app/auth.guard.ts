import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserAccountService } from './services/user-account.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAccountService: UserAccountService, private router: Router) {
  }
  canActivate(): boolean {
    if (this.userAccountService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

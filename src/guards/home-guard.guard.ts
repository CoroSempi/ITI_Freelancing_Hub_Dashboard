import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('AccessToken');
    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      this.router.navigate(['/signIn']);
      return false;
    }
  }

  private isTokenValid(token: string): boolean {
    return true;
  }
}

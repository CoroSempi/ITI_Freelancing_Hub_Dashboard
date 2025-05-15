import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

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
    this.authService.checkToken().subscribe(
      (response) => {
        console.log(response);
        return true;
      },
      (error) => {
        console.log('token expired');
        this.router.navigate(['/signIn']);
        return false;
      }
    );
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ChatsService } from '../services/Chats/Chats.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private chatsService: ChatsService) {}

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
    this.chatsService.getAllChats().subscribe(
      (response) => {
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

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ChatsService } from '../../services/Chats/Chats.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  unreadChat: number = 0;
  constructor(private chatsService: ChatsService) {}

  ngOnInit(): void {
    this.chatsService.unreadCount$.subscribe((count) => {
      this.unreadChat = count;
    });
  }

  logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('adminData');
  }
}

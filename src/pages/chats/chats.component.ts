import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../services/Chats/Chats.service';
import { iChats } from '../../interfaces/iChats';
import { IMsg } from '../../interfaces/iMsg';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  imports: [CommonModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  allChats: iChats[] = [];
  filterdChats: iChats[] = [];
  chats!: iChats[];
  unread: boolean = false;
  constructor(private chatsService: ChatsService, private nav: Router) {}
  ngOnInit(): void {
    this.chatsService.getAllChats().subscribe((response) => {
      this.chats = response;

      this.chats.forEach((std) => {
        this.allChats.push(std);
        if (this.getUnreadCount(std)) {
          this.filterdChats.push(std);
        }
      });
    });
  }

  getLast(chat: any): IMsg {
    const last = chat?.ChatRoom?.[chat.ChatRoom.length - 1];
    return last || 'No messages yet.';
  }

  getUnreadCount(chat: any): number {
    let count = 0;

    chat.ChatRoom.forEach((msg: any) => {
      if (msg.received === false && msg.seen === false) {
        count += 1;
      }
    });

    return count;
  }

  formatStamp(msgDate: any) {
    const date = new Date(msgDate);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day} ${month} ${year}`;
  }
  handleFliter(bool: boolean) {
    this.unread = bool;
    if (bool) {
      this.chats = this.filterdChats;
    } else {
      this.chats = this.allChats;
    }
  }

  toChat(id: string): void {
    this.nav.navigate(['studentChat/' + id]);
  }
}

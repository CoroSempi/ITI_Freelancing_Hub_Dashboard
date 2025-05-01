import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ChatsService } from '../../services/Chats/Chats.service';
import { iChats } from '../../interfaces/iChats';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.css'],
  imports: [FormsModule],
})
export class StudentChatComponent implements OnInit {
  studentID!: string;
  chat!: iChats;
  message: string = '';
  constructor(
    private route: ActivatedRoute,
    private chatsService: ChatsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.studentID = id || 'none';

      this.chatsService.getChatByID(this.studentID).subscribe((response) => {
        this.chat = response;
      });
    });
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
    return `${hours}:${minutes} ${day} ${month} `;
  }

  back(): void {
    this.location.back();
  }

  sendMessage() {
    this.chatsService
      .sendMessage({ content: this.message, studentID: this.studentID })
      .subscribe((response) => {
        this.chat = response;
        this.message = '';
      });
  }
}

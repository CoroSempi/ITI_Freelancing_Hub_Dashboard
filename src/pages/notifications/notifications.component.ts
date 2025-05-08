import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from '../../services/notifications/notification.service';
import { ISpicificUsers } from '../../interfaces/i-spicific-users';

@Component({
  selector: 'app-notifications',
  imports: [RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  users: ISpicificUsers[] = [];
  constructor(private _notificationService:NotificationService) {   
  }

  ngOnInit() {
  }
}

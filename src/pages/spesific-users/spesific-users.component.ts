import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notifications/notification.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ISpicificUsers } from '../../interfaces/i-spicific-users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spesific-users',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './spesific-users.component.html',
  styleUrls: ['./spesific-users.component.css'],
})
export class SpesificUsersComponent implements OnInit {
  searchInput = new FormControl('');

  titleInput = new FormControl('');
  messageInput = new FormControl('');
  selectedUsers: any[] = [];
  searchResults: any[] = [];
  isLoading = false;
  isSubmitting = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((keyword) => {
          this.isLoading = true;
          if (!keyword || keyword.trim() === '') {
            this.isLoading = false;
            this.searchResults = [];
            return [];
          }
          return this.notificationService.searchUsers(keyword);
        })
      )
      .subscribe({
        next: (results) => {
          if (results && results.length) {
            this.searchResults = results;
          } else {
            this.searchResults = [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error searching users:', error);
          this.isLoading = false;
        },
      });
  }

  selectUser(user: ISpicificUsers) {
    if (!this.selectedUsers.some((u) => u._id === user._id)) {
      this.selectedUsers.push(user);
      this.searchInput.setValue('');
      this.searchInput.setValue('');
      this.searchResults = [];
    }
  }
  removeUser(index: number) {
    this.selectedUsers.splice(index, 1);
  }
  submitNotification() {
    const notificationContent = this.messageInput.value;
    const notificationTitle = this.titleInput.value;
    const userIds = this.selectedUsers.map((user) => user._id);
    this.isSubmitting = true;
    this.notificationService
      .sendSpecificNotification(notificationTitle, notificationContent, userIds)
      .subscribe({
        next: (response) => {
          this.selectedUsers = [];
          this.messageInput.setValue('');
          this.titleInput.setValue('');
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error sending notification:', error);
          this.isSubmitting = false;
        },
      });
  }
}

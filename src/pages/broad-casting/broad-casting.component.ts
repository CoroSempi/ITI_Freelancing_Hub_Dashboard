import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notifications/notification.service';
import ITICourses from '../tracks/addnew/ITICourses';

@Component({
  selector: 'app-broad-casting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './broad-casting.component.html',
  styleUrls: ['./broad-casting.component.css'],
})
export class BroadCastingComponent {
  itiTracks: string[] = ITICourses;
  selectedTrack: string = this.itiTracks[0];
  notificationTitle: string = '';
  notificationContent: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private notificationService: NotificationService) {}

  selectTrack(track: string): void {
    this.selectedTrack = track;
  }

  sendBroadcastNotification(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.notificationContent.trim()) {
      this.errorMessage = 'Notification content is required';
      return;
    }
    this.isLoading = true;

    this.notificationService
      .sendBroadcastNotification(
        this.notificationTitle,
        this.notificationContent,
        this.selectedTrack
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.successMessage = 'Broadcast notification sent successfully!';
          this.errorMessage = '';
          this.resetForm();
        },
        error: (error) => {
          console.error('Error sending broadcast notification:', error);
          this.isLoading = false;
          this.errorMessage = error.error.message;
          this.successMessage = '';
          this.resetForm();
        },
      });
  }
  resetForm(): void {
    this.notificationContent = '';
    this.notificationTitle = '';
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notifications/notification.service';

@Component({
  selector: 'app-broad-casting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './broad-casting.component.html',
  styleUrls: ['./broad-casting.component.css']
})
export class BroadCastingComponent {
  selectedTrack: string = 'Front End and Cross Platform Mobile Development';
  notificationTitle: string = '';
  notificationContent: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private notificationService: NotificationService) {}

  selectTrack(track: string): void {
    this.selectedTrack = track;
  }
  private getTrackNameForAPI(displayTrackName: string): string {
    return "Front End and Cross Platform Mobile Development";
  }

  sendBroadcastNotification(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.notificationContent.trim()) {
      this.errorMessage = 'Notification content is required';
      return;
    }
    this.isLoading = true;
    
    const apiTrackName = this.getTrackNameForAPI(this.selectedTrack);
    
    this.notificationService.sendBroadcastNotification(
      this.notificationContent,
      apiTrackName
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Broadcast notification sent successfully!';
        this.resetForm();
      },
      error: (error) => {
        console.error('Error sending broadcast notification:', error);

        this.isLoading = false;
        this.successMessage = 'Broadcast notification sent successfully!';
        this.resetForm();
      }
    });
  }
  resetForm(): void {
    this.notificationContent = '';
    this.notificationTitle = '';
  }
}
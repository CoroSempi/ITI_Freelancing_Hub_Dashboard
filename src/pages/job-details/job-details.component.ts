import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../services/Jobs/jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
})
export class JobDetailsComponent implements OnInit {
  job: any;
  id: string = '';
  returnTo: string = '';
  chat: any;
  commentText: string = '';
  rate: number = 0;
  isLoading: boolean = true;
  avatar: string = '';
  firstTime: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private allJobsService: JobsService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firstTime = false;
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.returnTo = history.state?.returnTo || '';
    this.getJobDetails();
  }

  getFirstTwoNames(studentName: string): string {
    const names = studentName.split(' ');
    return names.length > 2 ? `${names[0]} ${names[1]}` : studentName;
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }

  getJobDetails(): void {
    if (!this.id) return;

    if (this.firstTime) {
      this.isLoading = true;
    }
    this.allJobsService.getJobById(this.id).subscribe(
      (response) => {
        this.avatar = response.avatar;
        this.job =
          response.directJob || response.remoteJob || response.platformJob;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching job details:', error);
        this.isLoading = false;
      }
    );
  }

  deleteJob(id: string): void {
    if (!id) return;

    this.allJobsService.deleteJobById(id).subscribe(
      () => {
        this.back();
      },
      (error) => {
        console.error('Error deleting job:', error);
      }
    );
  }

  back() {
    this.router.navigate([this.returnTo || '/']);
  }

  acceptJob(): void {
    if (!this.id) return;

    const updateData = { verified: true };
    this.allJobsService.acceptJob(this.id, updateData).subscribe(
      (response) => {
        this.job.verified = true;
      },
      (error) => {
        console.error('Error verifying job:', error);
      }
    );
  }

  addComment() {
    const commentData = {
      content: this.commentText,
      rate: this.rate,
    };

    this.allJobsService.addCommentToJob(this.id, commentData).subscribe({
      next: (res) => {
        this.getJobDetails();
        this.commentText = '';
        this.rate = 0;
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }

  deleteComment(id: string) {
    this.allJobsService.deleteComment(this.id, id).subscribe({
      next: (res) => {
        this.getJobDetails();
      },
      error: (err) => {
        console.error('Error deleting comment:', err);
      },
    });
  }

  openChat() {
    this.router.navigate(['studentChat/' + this.job.uploadedBy]);
  }
}

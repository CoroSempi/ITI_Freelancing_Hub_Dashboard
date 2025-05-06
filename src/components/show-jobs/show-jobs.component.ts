import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-jobs',
  templateUrl: './show-jobs.component.html',
  styleUrls: ['./show-jobs.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [DatePipe],
})
export class ShowJobsComponent {
  @Input() jobs: any[] = [];
  currentUrl: string = '';

  constructor(private datePipe: DatePipe, private router: Router) {
    this.currentUrl = this.router.url;
  }

  getFirstTwoNames(studentName: string): string {
    const names = studentName.split(' ');
    return names.length > 2 ? `${names[0]} ${names[1]}` : studentName;
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }
}

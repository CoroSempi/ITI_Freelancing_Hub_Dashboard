import { Component, OnInit } from '@angular/core';
import { ShowJobsComponent } from '../../components/show-jobs/show-jobs.component';
import { CommonModule } from '@angular/common';
import { JobsService } from '../../services/Jobs/jobs.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  imports: [ShowJobsComponent, CommonModule],
})
export class RequestsComponent implements OnInit {
  constructor(private jobsService: JobsService) {}

  allJobs: any[] = [];
  jobs: any[] = [];
  selected: string = 'all';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = false;


  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.isLoading = true;
    this.jobsService.getAllJobs().subscribe({
      next: (data) => {
        this.allJobs = data;
        this.applyFilter();
        const count = this.allJobs.filter((req: any) => !req.verified).length;
        this.jobsService.setUnseenRequests(count);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.isLoading = false;
      },
    });
  }

  applyFilter(): void {
    let filteredJobs =
      this.selected === 'pending'
        ? this.allJobs.filter((job) => job.verified === false)
        : this.selected === 'approved'
        ? this.allJobs.filter((job) => job.verified === true)
        : this.allJobs;

    this.totalPages = Math.ceil(filteredJobs.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePage(filteredJobs);
  }

  updatePage(filteredJobs: any[]): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.jobs = filteredJobs.slice(startIndex, endIndex);
  }

  filterJobs(type: string): void {
    this.selected = type;
    this.currentPage = 1;
    this.applyFilter();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilter();
    }
  }
}

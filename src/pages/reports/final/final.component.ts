import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports/reports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css'],
  imports: [CommonModule],
})
export class FinalComponent implements OnInit {
  selectedBranch!: string;
  selectedRound!: string;
  reportData: any;
  report: any;
  isLoading: boolean = false;
  notFound: boolean = false;

  constructor(private reportService: ReportsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.reportService.getReportData().subscribe(
      (response) => {
        this.isLoading = false;
        this.reportData = response;
        this.selectedBranch = this.reportData.branches[0];
        this.selectedRound = this.reportData.rounds[0];

        this.generateReport();
      },
      (error) => {
        console.error('Error fetching:', error);
        this.isLoading = false;
      }
    );
  }

  selectRound(selectedRound: string) {
    this.selectedRound = selectedRound;
  }

  selectBranch(selectedBranch: string) {
    this.selectedBranch = selectedBranch;
  }

  generateReport() {
    this.isLoading = true;
    this.reportService
      .getFinalReport(this.selectedBranch, this.selectedRound)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.report = response;
          this.notFound = false;
        },
        (error) => {
          console.error('Error generating report:', error);
          this.notFound = true;
          this.isLoading = false;
        }
      );
  }

  getPercentageValue(percentStr: string): number {
    if (!percentStr) return 0;
    return +percentStr.replace('%', '');
  }
}

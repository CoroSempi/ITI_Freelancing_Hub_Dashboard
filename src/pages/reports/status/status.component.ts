import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../services/reports/reports.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  imports: [CommonModule, NgxChartsModule],
})
export class StatusComponent implements OnInit {
  selectedBranch!: string;
  selectedRound!: string;
  selectedTrack!: string;
  reportData: any;
  report: any;
  studentsData: any;
  jobTypeData: any;
  isLoading: boolean = false;
  notFound: boolean = false;

  colorScheme = {
    name: 'redShades',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#D94B52', '#E77A7F', '#F1B0B7'],
  };

  view: [number, number] = [270, 350];

  constructor(private reportService: ReportsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.reportService.getReportData().subscribe(
      (response) => {
        this.isLoading = false;
        this.reportData = response;
        this.selectedBranch = this.reportData.branches[0];
        this.selectedRound = this.reportData.rounds[0];
        this.selectedTrack = this.reportData.tracks[0];
        this.generateReport();
      },
      (error) => {
        console.error('Error fetching:', error);
        this.isLoading = false;
      }
    );
  }

  selectTrack(selectedTrack: string) {
    this.selectedTrack = selectedTrack;
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
      .getStatusReport(
        this.selectedBranch,
        this.selectedRound,
        this.selectedTrack
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.report = response;
          this.notFound = false;

          this.studentsData = [
            { name: '🎓 Target Achievers', value: this.report.totalAchievers },
            {
              name: '❌ Not Yet Achieved',
              value: this.report.totalStudents - this.report.totalAchievers,
            },
          ];

          this.jobTypeData = [
            { name: 'Direct Contact Job', value: this.report.direct },
            { name: 'Platform Job', value: this.report.platform },
            { name: 'Remote Job', value: this.report.remote },
          ];
        },
        (error) => {
          console.error('Error generating report:', error);
          this.notFound = true;
          this.isLoading = false;
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '../../services/Certificates/certificates.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  imports: [RouterLink, CommonModule],
  providers: [DatePipe],
  styleUrls: ['./certificates.component.css'],
})
export class CertificatesComponent implements OnInit {
  allCertificates!: any[];
  approvedCertificates!: any[];
  pendingCertificates!: any[];
  certificates!: any[];
  filter: String = 'All';
  loading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;

  constructor(
    private datePipe: DatePipe,

    private certificatesService: CertificatesService
  ) {}

  ngOnInit() {
    this.getCertificates();
  }

  getCertificates(): void {
    this.loading = true;
    this.certificatesService.getAllCertificates().subscribe({
      next: (data) => {
        this.allCertificates = data;
        this.certificates = data;
        this.approvedCertificates = data.filter((cer: any) => cer.verified);
        this.pendingCertificates = data.filter((cer: any) => !cer.verified);

        const count = this.certificates.filter(
          (cer: any) => !cer.verified
        ).length;
        this.certificatesService.setUnseenCertificates(count);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.loading = false;
      },
    });
  }

  handleFilter(filter: string) {
    if (filter == 'All') {
      this.certificates = this.allCertificates;
      this.filter = filter;
    } else if (filter == 'Pending') {
      this.certificates = this.pendingCertificates;
      this.filter = filter;
    } else {
      this.certificates = this.approvedCertificates;
      this.filter = filter;
    }
  }

  getFirstTwoNames(studentName: string): string {
    const names = studentName.split(' ');
    return names.length > 2 ? `${names[0]} ${names[1]}` : studentName;
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }
}

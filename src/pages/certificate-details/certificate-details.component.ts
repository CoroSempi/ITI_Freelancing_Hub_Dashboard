import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../../services/Jobs/jobs.service';
import { CertificatesService } from '../../services/Certificates/certificates.service';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
})
export class CertificateDetailsComponent implements OnInit {
  cer: any;
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
    private certificatesService: CertificatesService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.returnTo = history.state?.returnTo || '';
    this.getCertificateDetails();
  }

  getFirstTwoNames(studentName: string): string {
    const names = studentName.split(' ');
    return names.length > 2 ? `${names[0]} ${names[1]}` : studentName;
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }

  getCertificateDetails(): void {
    if (!this.id) return;

    if (this.firstTime) {
      this.isLoading = true;
      console.log('Loading Certificate details...');
    }
    this.certificatesService.getCertificateById(this.id).subscribe(
      (response) => {
        console.log('Certificate details:', response);
        this.avatar = response.avatar;
        this.cer = response.certificate;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching Certificate details:', error);
        this.isLoading = false;
      }
    );
  }

  deleteCertificate(id: string): void {
    if (!id) return;

    this.certificatesService.deleteCertificateById(id).subscribe(
      () => {
        console.log('Certificate deleted successfully');
        this.back();
      },
      (error) => {
        console.error('Error deleting Certificate:', error);
      }
    );
  }

  back() {
    this.router.navigate([this.returnTo || '/']);
  }

  acceptJob(): void {
    if (!this.id) return;

    this.certificatesService.acceptCertificate(this.id).subscribe(
      (response) => {
        console.log('Certificate verified successfully:', response);
        this.cer.verified = true;
      },
      (error) => {
        console.error('Error verifying Certificate:', error);
      }
    );
  }

  openChat() {
    this.router.navigate(['studentChat/' + this.cer.uploadedBy]);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CertificatesService } from '../../services/Certificates/certificates.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-certificates',
  templateUrl: './show-certificates.component.html',
  imports: [RouterLink, CommonModule],
  providers: [DatePipe],
  styleUrls: ['./show-certificates.component.css'],
})
export class ShowCertificatesComponent implements OnInit {
  loading: boolean = false;

  @Input() certificates: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private certificatesService: CertificatesService
  ) {
    console.log(this.certificates);
  }

  ngOnInit() {}

  getFirstTwoNames(studentName: string): string {
    const names = studentName.split(' ');
    return names.length > 2 ? `${names[0]} ${names[1]}` : studentName;
  }

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }
}

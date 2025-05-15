import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChatsService } from '../../services/Chats/Chats.service';
import { JobsService } from '../../services/Jobs/jobs.service';
import { CertificatesService } from '../../services/Certificates/certificates.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  unreadChat: number = 0;
  unseenRequests: number = 0;
  unseenCertificates: number = 0;
  constructor(
    private chatsService: ChatsService,
    private jobService: JobsService,
    private certificatesService: CertificatesService
  ) {}

  ngOnInit(): void {
    this.chatsService.unreadCount$.subscribe((count) => {
      this.unreadChat = count;
    });

    this.jobService.unseenRequests$.subscribe((count) => {
      this.unseenRequests = count;
    });

    this.certificatesService.unseenCertificates$.subscribe((count) => {
      this.unseenCertificates = count;
    });
  }

  logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('adminData');
  }
}

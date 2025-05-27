import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  imports: [CommonModule, RouterOutlet, RouterLink],
})
export class ReportsComponent implements OnInit {
  activeTab: string = 'status';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.parseUrl(this.router.url);
    if (this.router.url.includes('status')) {
      this.setActive('status');
    } else if (this.router.url.includes('earnings')) {
      this.setActive('earnings');
    } else {
      this.setActive('final');
    }
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}

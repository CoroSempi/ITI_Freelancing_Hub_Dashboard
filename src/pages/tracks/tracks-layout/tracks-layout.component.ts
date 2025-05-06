import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tracks-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './tracks-layout.component.html',
  styleUrl: './tracks-layout.component.css',
})
export class TracksLayoutComponent implements OnInit {
  isActiveSearch = false;
  activeTab: string = '';


  ngOnInit(): void {
    this.router.parseUrl(this.router.url);
     if( this.router.url.includes('all')) {
      this.setActive('allTracks');
    }
    else{
      this.setActive('addNew');
    }
  } 

  constructor(private router: Router) {
    

  }
  activateSearch() {
    this.isActiveSearch = true;
  }

  deactivateSearch() {
    this.isActiveSearch = false;
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}

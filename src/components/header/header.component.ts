import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [SearchBarComponent],
})
export class HeaderComponent implements OnInit {
  branch: string = '';
  admin: string = '';

  constructor() {}

  ngOnInit(): void {
    const admin = localStorage.getItem('adminData');
    if (admin) {
      let data = JSON.parse(admin);
      this.branch = data.branch;
      this.admin =
        data.fullName.split(' ')[0] + ' ' + data.fullName.split(' ')[1];
    }
  }

  logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('adminData');
  }
}

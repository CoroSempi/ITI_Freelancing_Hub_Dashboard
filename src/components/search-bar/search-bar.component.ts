import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/Users/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [FormsModule, CommonModule],
})
export class SearchBarComponent implements OnInit {
  keyword: string = '';
  users: any[] = [];
  constructor(private userService: UsersService, private nav: Router) {}

  ngOnInit() {}

  searching(): void {
    this.userService.search(this.keyword).subscribe((response) => {
      this.users = response;
    });
  }

  out(): void {
    setTimeout(() => {
      this.keyword = '';
    }, 100);
  }

  toUserPage(id: string): void {
    this.nav.navigate(['editUser/' + id]);
  }
}

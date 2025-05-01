import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css'],
})
export class NotFoundComponent {
  constructor(private nav: Router) {}

  backToHome() {
    this.nav.navigate(['/home']);
  }
}

import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SideBarComponent } from '../components/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}
  authPages(): boolean {
    return (
      this.router.url == '/signIn' ||
      this.router.url == '/forgetPassword' ||
      this.router.url.includes('/verifyCode') ||
      this.router.url == '/resetPassword'
    );
  }
  title = 'ITI_Dashboard';
}

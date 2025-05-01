import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { ChangePasswordComponent } from "../components/change-password/change-password.component";
import { EditProfileComponent } from "../components/edit-profile/edit-profile.component";
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBarComponent, SettingsComponent, ChangePasswordComponent, EditProfileComponent, HeaderComponent],
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
      this.router.url == '/resetPassword' ||
      this.router.url == '/notFound'
    );
  }
  title = 'ITI_Dashboard';
}

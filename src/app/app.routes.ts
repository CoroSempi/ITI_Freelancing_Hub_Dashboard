import { Routes } from '@angular/router';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { ForgetPasswordComponent } from '../pages/forget-password/forget-password.component';
import { VerifyCodeComponent } from '../pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { HomeComponent } from '../pages/home/home.component';
import { HomeGuard } from '../guards/home-guard.guard';
import { AuthComponent } from '../pages/auth/auth.component';
import { RequestsComponent } from '../pages/requests/requests.component';
import { TracksComponent } from '../pages/tracks/tracks.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { ChatsComponent } from '../pages/chats/chats.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'requests', component: RequestsComponent },
  { path: 'tracks', component: TracksComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'settings', component: SettingsComponent },

  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signIn', component: SignInComponent },
      { path: 'forgetPassword', component: ForgetPasswordComponent },
      { path: 'verifyCode', component: VerifyCodeComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
    ],
  },
];

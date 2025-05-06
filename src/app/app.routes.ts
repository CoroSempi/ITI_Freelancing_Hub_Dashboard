import { Routes } from '@angular/router';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { ForgetPasswordComponent } from '../pages/forget-password/forget-password.component';
import { VerifyCodeComponent } from '../pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthComponent } from '../pages/auth/auth.component';
import { RequestsComponent } from '../pages/requests/requests.component';
 import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { ChatsComponent } from '../pages/chats/chats.component';
import { NotFoundComponent } from '../pages/notFound/notFound.component';
import { StudentChatComponent } from '../pages/student-chat/student-chat.component';
import { TracksLayoutComponent } from '../pages/tracks/tracks-layout/tracks-layout.component';
import { AddnewComponent } from '../pages/tracks/addnew/addnew.component';
import { TracksAllComponent } from '../pages/tracks/trackall/tracks.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  {
    path: 'tracks',
    component: TracksLayoutComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'add', component: AddnewComponent },
      { path: 'all', component: TracksAllComponent },
    ] , canActivate: [AuthGuard]
  }, 
  
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard] },
  {
    path: 'studentChat/:id',
    component: StudentChatComponent,
    canActivate: [AuthGuard],
  },

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
  { path: 'notFound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notFound' },
];

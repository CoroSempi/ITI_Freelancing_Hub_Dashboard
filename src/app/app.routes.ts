import { Routes } from '@angular/router';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { ForgetPasswordComponent } from '../pages/forget-password/forget-password.component';
import { VerifyCodeComponent } from '../pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthComponent } from '../pages/auth/auth.component';
import { RequestsComponent } from '../pages/requests/requests.component';
import { ChatsComponent } from '../pages/chats/chats.component';
import { NotFoundComponent } from '../pages/notFound/notFound.component';
import { StudentChatComponent } from '../pages/student-chat/student-chat.component';
import { TracksLayoutComponent } from '../pages/tracks/tracks-layout/tracks-layout.component';
import { AddnewComponent } from '../pages/tracks/addnew/addnew.component';
import { TracksAllComponent } from '../pages/tracks/trackall/tracks.component';
import { JobDetailsComponent } from '../pages/job-details/job-details.component';
import { TrackDetailsComponent } from '../pages/trackDetails/trackDetails.component';
import { SpesificUsersComponent } from '../pages/spesific-users/spesific-users.component';
import { BroadCastingComponent } from '../pages/broad-casting/broad-casting.component';
import { EditUserComponent } from '../pages/EditUser/EditUser.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { CertificatesComponent } from '../pages/certificates/certificates.component';
import { CertificateDetailsComponent } from '../pages/certificate-details/certificate-details.component';
import { ReportsComponent } from '../pages/reports/reports.component';
import { StatusComponent } from '../pages/reports/status/status.component';
import { FinalComponent } from '../pages/reports/final/final.component';
import { EarningsComponent } from '../pages/reports/earnings/earnings.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  {
    path: 'job-details/:id',
    component: JobDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: `certificates`,
    component: CertificatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: `certificate-details/:id`,
    component: CertificateDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'track/:id/:trackName',
    component: TrackDetailsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'editUser/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    children: [
      { path: '', redirectTo: 'spesificUsers', pathMatch: 'full' },
      { path: 'spesificUsers', component: SpesificUsersComponent },
      { path: 'broadCasting', component: BroadCastingComponent },
    ],
    canActivate: [AuthGuard],
  },

  {
    path: 'tracks',
    component: TracksLayoutComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'add', component: AddnewComponent },
      { path: 'all', component: TracksAllComponent },
    ],
    canActivate: [AuthGuard],
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
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],

    children: [
      { path: '', redirectTo: 'status', pathMatch: 'full' },
      { path: 'status', component: StatusComponent },
      { path: 'earnings', component: EarningsComponent },
      { path: 'final', component: FinalComponent },
    ],
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

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassword!: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private nav: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.forgetPassword = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.loading = true;
    console.log(this.loading);
    console.log('pressed');

    if (this.forgetPassword.valid) {
      this.authService
        .sendCode(this.forgetPassword.get('email')?.value)
        .subscribe(
          (response) => {
            this.loading = false;
            this.cd.detectChanges();
            this.nav.navigate(['verifyCode'], {
              queryParams: { email: this.forgetPassword.get('email')?.value },
            });
          },
          (error) => {
            this.loading = false;
            this.error = error.error.message;
            console.error('Error:', error.error.message);
            this.cd.detectChanges();
          }
        );
    } else {
      this.loading = false;
      this.cd.detectChanges();
    }
  }
}

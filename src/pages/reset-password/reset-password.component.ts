import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading: Boolean = false;
  error: String = '';
  isPass: Boolean = true;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private nav: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formbuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.loading = true;
      this.cd.detectChanges();
      this.authService
        .resetPassword(this.resetPasswordForm.get('password')?.value)
        .subscribe(
          (response) => {
            this.loading = false;
            this.cd.detectChanges();
            this.error = '';
            console.log(response);
            // this.nav.navigate(['/']);
          },
          (error) => {
            console.log(error);
            this.loading = false;
            this.error = error.error.message;
            this.cd.detectChanges();
            console.error('Error:', error.error.message);
          }
        );
    }
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('passwordConfirmation');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    return confirmPasswordControl.value === passwordControl.value
      ? null
      : { passwordMismatch: true };
  }

  passwordToggle(): void {
    this.isPass = !this.isPass;
  }

  toSignIn(): void {
    this.nav.navigate(['signIn']);
  }
}

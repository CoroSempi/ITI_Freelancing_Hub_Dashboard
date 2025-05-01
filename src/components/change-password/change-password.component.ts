import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
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
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPasswordConfirmation: [
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
        .changePassword({
          currentPassword: this.resetPasswordForm.get('password')?.value,
          newPassword: this.resetPasswordForm.get('newPassword')?.value,
        })
        .subscribe(
          (response) => {
            this.loading = false;
            this.cd.detectChanges();
            this.error = 'Password changed successfully';
            this.resetPasswordForm.reset();
          },
          (error) => {
            this.loading = false;
            this.error = error.error.message;
            this.cd.detectChanges();
            console.error('Error:', error.error.message);
          }
        );
    }
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('newPasswordConfirmation');

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

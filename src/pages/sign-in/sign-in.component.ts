import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
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
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.cd.detectChanges();

    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe(
        (response) => {
          this.loading = false;
          this.cd.detectChanges();

          localStorage.setItem('AccessToken', response.AccessToken);
          this.error = '';
          this.nav.navigate(['/home']);
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

  passwordToggle(): void {
    this.isPass = !this.isPass;
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-verify-code',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  code: string[] = ['', '', '', '', '', ''];

  loading: boolean = false;
  error: string = '';
  email!: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private nav: Router
  ) {}

  handleDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1) {
      const nextInput = document.querySelectorAll('.digit-input')[
        index + 1
      ] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
  moveFocus(event: any, index: number, nextInput: HTMLInputElement) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (input.value === '') {
        const previousInput = document.querySelectorAll('.digit-input')[
          index - 1
        ] as HTMLInputElement;
        if (previousInput) {
          previousInput.focus();
        }
      }
    }
  }

  sendCode(): void {
    const codeString = this.code.join('');
    this.loading = true;

    this.cd.detectChanges();
    this.authService
      .verifyCode({ code: codeString, email: this.email })
      .subscribe(
        (response) => {
          this.loading = false;
          this.cd.detectChanges();

          localStorage.setItem('AccessToken', response.AccessToken);
          this.error = '';
          this.nav.navigate(['/resetPassword']);
        },
        (error) => {
          this.loading = false;
          this.error = error.error.message;
          this.cd.detectChanges();
          console.error('Error:', error.error.message);
        }
      );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }
}

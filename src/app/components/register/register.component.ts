import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path if needed

// Custom validator for password match
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Don't validate if controls haven't been initialized yet
  if (!password || !confirmPassword) {
    return null;
  }

  // Return error if passwords don't match
  return password.value === confirmPassword.value
    ? null
    : { passwordsMismatch: true };
};

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]], // Add minLength or other rules
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    ); // Add custom validator to the group
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    // Only send email and password to the backend
    const { email, password } = this.registerForm.value;

    // Pass the payload as a single object
    this.authService.register({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        // Navigate to login page or show success message after registration
        alert('Registration successful! Please log in.'); // Simple alert for now
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.message || 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      },
    });
  }
}

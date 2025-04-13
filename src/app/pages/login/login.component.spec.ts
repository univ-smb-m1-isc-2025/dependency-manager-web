import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login service when form is valid', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    authService.login.and.returnValue(
      of({
        status: 'success',
        message: '',
        data: { token: 'test-token', account: {} },
      })
    );

    component.loginForm.setValue({
      email: testEmail,
      password: testPassword,
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(testEmail, testPassword);
  });
});

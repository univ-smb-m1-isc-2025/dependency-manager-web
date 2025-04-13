import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { errorInterceptor } from './interceptors/error.interceptor';
import { ErrorService } from './services/error/error.service';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])),
    provideRouter(routes),
    ErrorService,
    AuthGuard,
    PublicGuard,
  ],
}).catch((err) => console.error(err));

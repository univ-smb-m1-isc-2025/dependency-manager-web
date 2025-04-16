import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { errorInterceptor } from './app/interceptors/error.interceptor';
import { tokenInterceptor } from './app/interceptors/token.interceptor';
import { ErrorService } from './app/services/error/error.service';
import { AuthGuard } from './app/guards/auth.guard';
import { PublicGuard } from './app/guards/public.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor, errorInterceptor])
    ),
    provideRouter(routes),
    ErrorService,
    AuthGuard,
    PublicGuard,
  ],
}).catch((err) => console.error(err));

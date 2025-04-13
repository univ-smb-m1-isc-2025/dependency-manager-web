import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DepotListComponent } from './components/depot-list/depot-list.component';
import { DepotDetailComponent } from './components/depot-detail/depot-detail.component';
export const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent, canActivate: [PublicGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [PublicGuard],
  },
  // Private routes
  { path: 'depots', component: DepotListComponent, canActivate: [AuthGuard] },
  {
    path: 'depots/:id',
    component: DepotDetailComponent,
    canActivate: [AuthGuard],
  },
  // Error routes
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

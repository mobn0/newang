import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard';
import { GalleryPage } from './pages/gallery';
import { LandingPage } from './pages/landing';
import { SigninPage } from './pages/signin';

export const routes: Routes = [
  { path: '', component: LandingPage, title: 'NewAng — Landing' },
  { path: 'dashboard', component: DashboardPage, title: 'NewAng — Dashboard' },
  { path: 'signin', component: SigninPage, title: 'NewAng — Sign in' },
  { path: 'gallery', component: GalleryPage, title: 'NewAng — Gallery' },
  { path: '**', redirectTo: '' },
];

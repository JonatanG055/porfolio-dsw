import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'portfolio', 
    loadComponent: () => import('./features/portfolio/portfolio.component').then(m => m.PortfolioComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) 
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];
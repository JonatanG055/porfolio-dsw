import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItem } from '../../../models/portfolio.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  
  navItems: NavItem[] = [
    { label: 'Inicio', route: '/', icon: 'bi-house-fill' },
    { label: 'Portafolio', route: '/portfolio', icon: 'bi-briefcase-fill' },
    { label: 'Sobre Mí', route: '/about', icon: 'bi-person-fill' },
    { label: 'Contacto', route: '/contact', icon: 'bi-envelope-fill' }
  ];

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
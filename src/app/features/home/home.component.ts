import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project, Service, Stat } from '../../models/portfolio.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  services: Service[] = [];
  stats: Stat[] = [];
  featuredProjects: Project[] = [];
  loading = true;
  
  private subscriptions = new Subscription();

  // Typing animation
  typedText = '';
  fullText = 'Full Stack Developer & Software Architect';
  typingSpeed = 100;
  private typingIndex = 0;

  constructor(private portfolioService: PortfolioDataService) {}

  ngOnInit(): void {
    this.loadData();
    this.startTypingAnimation();
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadData(): void {
    this.subscriptions.add(
      this.portfolioService.getServices().subscribe(services => {
        this.services = services;
      })
    );

    this.subscriptions.add(
      this.portfolioService.getStats().subscribe(stats => {
        this.stats = stats;
      })
    );

    this.subscriptions.add(
      this.portfolioService.getFeaturedProjects().subscribe(projects => {
        this.featuredProjects = projects;
        this.loading = false;
      })
    );
  }

  private startTypingAnimation(): void {
    const typeChar = () => {
      if (this.typingIndex < this.fullText.length) {
        this.typedText += this.fullText.charAt(this.typingIndex);
        this.typingIndex++;
        setTimeout(typeChar, this.typingSpeed);
      }
    };
    typeChar();
  }

  private initScrollAnimations(): void {
    if (typeof window !== 'undefined') {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  downloadCV(): void {
    // Implementar descarga de CV
    console.log('Descargando CV...');
  }
}
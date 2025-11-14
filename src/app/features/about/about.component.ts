import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ContactInfo, Skill, TimelineItem } from '../../models/portfolio.models';

interface Certification {
  title: string;
  issuer: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  contactInfo!: ContactInfo;
  timeline: TimelineItem[] = [];
  skillsColumn1: Skill[] = [];
  skillsColumn2: Skill[] = [];
  certifications: Certification[] = [
    {
      title: 'Full Stack Development',
      issuer: 'Certificación Profesional',
      description: 'Certificación completa en desarrollo moderno con React, Next.js y Node.js',
      icon: 'bi-award-fill'
    },
    {
      title: 'Software Architecture',
      issuer: 'Certificación Profesional',
      description: 'Patrones de diseño, microservicios y arquitecturas escalables',
      icon: 'bi-diagram-3-fill'
    },
    {
      title: 'AWS & Azure',
      issuer: 'Cloud Fundamentals',
      description: 'Certificaciones fundamentales en las principales plataformas cloud',
      icon: 'bi-cloud-fill'
    }
  ];

  profileImage = 'https://raw.githubusercontent.com/JonatanG055/imagenes-repo/refs/heads/main/8d09cfab-0a8e-4d3c-9f7f-85932df85424.jfif';
  
  loading = true;
  private subscriptions = new Subscription();

  constructor(private portfolioService: PortfolioDataService) {}

  ngOnInit(): void {
    this.loadData();
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadData(): void {
    // Load contact info
    this.subscriptions.add(
      this.portfolioService.getContactInfo().subscribe(info => {
        this.contactInfo = info;
      })
    );

    // Load timeline
    this.subscriptions.add(
      this.portfolioService.getTimeline().subscribe(timeline => {
        this.timeline = timeline;
      })
    );

    // Load skills
    this.subscriptions.add(
      this.portfolioService.getSkills().subscribe(skills => {
        // Split skills into two columns
        const midpoint = Math.ceil(skills.length / 2);
        this.skillsColumn1 = skills.slice(0, midpoint);
        this.skillsColumn2 = skills.slice(midpoint);
        this.loading = false;
      })
    );
  }

  // Método para limpiar espacios del teléfono
  getPhoneLink(phone: string): string {
    return 'tel:' + phone.replace(/\s/g, '');
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
}
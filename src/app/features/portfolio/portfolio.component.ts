import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project, ProjectCategory } from '../../models/portfolio.models';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  
  selectedCategory: string = 'all';
  selectedProject: Project | null = null;
  showModal = false;

  categories = [
    { id: 'all', label: 'Todos', icon: 'bi-grid-fill' },
    { id: ProjectCategory.FRONTEND, label: 'Frontend', icon: 'bi-laptop' },
    { id: ProjectCategory.BACKEND, label: 'Backend', icon: 'bi-server' },
    { id: ProjectCategory.FULLSTACK, label: 'Full Stack', icon: 'bi-layers' },
    { id: ProjectCategory.MOBILE, label: 'Mobile', icon: 'bi-phone' },
    { id: ProjectCategory.AI_ML, label: 'AI/ML', icon: 'bi-robot' }
  ];

  private subscriptions = new Subscription();

  constructor(private portfolioService: PortfolioDataService) {}

  ngOnInit(): void {
    this.loadProjects();
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadProjects(): void {
    this.subscriptions.add(
      this.portfolioService.getProjects().subscribe(projects => {
        this.allProjects = projects;
        this.filteredProjects = projects;
        this.loading = false;
      })
    );
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'all') {
      this.filteredProjects = this.allProjects;
    } else {
      this.filteredProjects = this.allProjects.filter(
        project => project.category === category
      );
    }

    // Re-trigger animations
    this.resetScrollAnimations();
  }

  openProjectModal(project: Project): void {
    this.selectedProject = project;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.showModal = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  private initScrollAnimations(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

  private resetScrollAnimations(): void {
    setTimeout(() => {
      const elements = document.querySelectorAll('.project-card');
      elements.forEach((el, index) => {
        el.classList.remove('visible');
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
      });
    }, 50);
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }
}
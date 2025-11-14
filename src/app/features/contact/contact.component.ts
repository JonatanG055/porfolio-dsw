import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ContactInfo } from '../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm!: FormGroup;
  contactInfo!: ContactInfo;
  isSubmitting = false;
  showSuccessAlert = false;
  
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioDataService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadContactInfo();
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
      privacyAccepted: [false, Validators.requiredTrue]
    });
  }

  private loadContactInfo(): void {
    this.subscriptions.add(
      this.portfolioService.getContactInfo().subscribe(info => {
        this.contactInfo = info;
      })
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.valid && field.touched);
  }

  getPhoneLink(phone: string): string {
    return 'tel:' + phone.replace(/\s/g, '');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      const formData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone || '',
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        privacyAccepted: this.contactForm.value.privacyAccepted
      };

      // Simulate API call
      this.subscriptions.add(
        this.portfolioService.submitContactForm(formData).subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.showSuccessAlert = true;
            this.contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              this.showSuccessAlert = false;
            }, 5000);
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Error submitting form:', error);
            // Aquí podrías mostrar un mensaje de error
          }
        })
      );
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
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
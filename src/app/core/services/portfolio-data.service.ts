import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  ContactInfo,
  Project,
  ProjectCategory,
  Service,
  Skill,
  SkillCategory,
  Stat,
  TimelineItem,
  TimelineType
} from '../../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {

  // ==================== PROJECTS DATA ====================
  private projects: Project[] = [
    {
      id: 'project-1',
      title: 'Frontend TaskManager',
      description: 'Sistema completo de gestión de tareas desarrollado con React. Incluye autenticación, CRUD completo y diseño responsive.',
      longDescription: 'Sistema completo de gestión de tareas con arquitectura moderna. Implementa autenticación JWT, estado global con Context API, y una interfaz intuitiva construida con React y Bootstrap. Desplegado en Vercel con CI/CD automático.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      technologies: ['React', 'TypeScript', 'Bootstrap', 'JWT', 'Vercel'],
      category: ProjectCategory.FRONTEND,
      demoUrl: 'https://frontend-5n1r.vercel.app/',
      featured: true,
      completedDate: new Date('2024-03-15'),
      features: [
        'Autenticación segura con JWT',
        'CRUD completo de tareas',
        'Filtros y búsqueda avanzada',
        'Diseño responsive',
        'Estado global con Context API'
      ]
    },
    {
      id: 'project-2',
      title: 'System Notes Book',
      description: 'Aplicación de gestión de notas con editor de texto enriquecido. Permite crear, organizar y buscar notas de manera eficiente.',
      longDescription: 'Aplicación web moderna para gestión de notas personales. Incluye editor de texto enriquecido, organización por categorías, búsqueda instantánea y sincronización local.',
      image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&h=600&fit=crop',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'],
      category: ProjectCategory.FRONTEND,
      featured: true,
      completedDate: new Date('2024-02-20'),
      features: [
        'Editor de texto con formato',
        'Organización por categorías',
        'Búsqueda instantánea',
        'Almacenamiento local',
        'Interfaz minimalista'
      ]
    },
    {
      id: 'project-3',
      title: 'Estructuras Control JS',
      description: 'Proyecto educativo que demuestra el uso de estructuras de control en JavaScript de forma visual e interactiva.',
      longDescription: 'Herramienta educativa interactiva para aprender estructuras de control en JavaScript. Incluye ejemplos en vivo, visualización de flujo de ejecución y ejercicios prácticos.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
      technologies: ['JavaScript', 'CSS3', 'Netlify'],
      category: ProjectCategory.FRONTEND,
      demoUrl: 'https://estructurascontroljs.netlify.app',
      featured: false,
      completedDate: new Date('2024-01-10'),
      features: [
        'Ejemplos interactivos de if/else',
        'Demostración de ciclos',
        'Switch case visual',
        'Código fuente visible',
        'Diseño educativo'
      ]
    },
    {
      id: 'project-4',
      title: 'Aplicación Web Moderna',
      description: 'Aplicación web interactiva con diseño moderno y responsive. Implementa las mejores prácticas de desarrollo frontend.',
      longDescription: 'Proyecto web que implementa las últimas tendencias en diseño y desarrollo frontend. Optimizado para rendimiento y accesibilidad.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
      category: ProjectCategory.FRONTEND,
      demoUrl: 'https://calm-custard-e95f8d.netlify.app',
      featured: false,
      completedDate: new Date('2023-12-05'),
      features: [
        'Diseño responsive',
        'Interfaz moderna',
        'Optimización de rendimiento',
        'Código limpio',
        'Deploy automatizado'
      ]
    }
  ];

  // ==================== SKILLS DATA ====================
  private skills: Skill[] = [
    { id: 'skill-1', name: 'React & Next.js', category: SkillCategory.FRONTEND, level: 95, icon: 'bi-react' },
    { id: 'skill-2', name: 'Angular', category: SkillCategory.FRONTEND, level: 90, icon: 'bi-circle-fill' },
    { id: 'skill-3', name: 'Vue.js', category: SkillCategory.FRONTEND, level: 85, icon: 'bi-triangle-fill' },
    { id: 'skill-4', name: 'TypeScript', category: SkillCategory.FRONTEND, level: 92, icon: 'bi-code-square' },
    { id: 'skill-5', name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: 95, icon: 'bi-palette-fill' },
    { id: 'skill-6', name: 'Node.js', category: SkillCategory.BACKEND, level: 90, icon: 'bi-server' },
    { id: 'skill-7', name: 'Express.js', category: SkillCategory.BACKEND, level: 88, icon: 'bi-lightning-fill' },
    { id: 'skill-8', name: 'NestJS', category: SkillCategory.BACKEND, level: 85, icon: 'bi-hexagon-fill' },
    { id: 'skill-9', name: 'Spring Boot', category: SkillCategory.BACKEND, level: 82, icon: 'bi-gear-fill' },
    { id: 'skill-10', name: '.NET Core', category: SkillCategory.BACKEND, level: 80, icon: 'bi-window' },
    { id: 'skill-11', name: 'PostgreSQL', category: SkillCategory.DATABASE, level: 88, icon: 'bi-database-fill' },
    { id: 'skill-12', name: 'MongoDB', category: SkillCategory.DATABASE, level: 85, icon: 'bi-leaf-fill' },
    { id: 'skill-13', name: 'Redis', category: SkillCategory.DATABASE, level: 80, icon: 'bi-lightning-charge-fill' },
    { id: 'skill-14', name: 'Docker', category: SkillCategory.DEVOPS, level: 85, icon: 'bi-box-seam' },
    { id: 'skill-15', name: 'Kubernetes', category: SkillCategory.DEVOPS, level: 80, icon: 'bi-heptagon-fill' },
    { id: 'skill-16', name: 'AWS', category: SkillCategory.DEVOPS, level: 85, icon: 'bi-cloud-fill' },
    { id: 'skill-17', name: 'Azure', category: SkillCategory.DEVOPS, level: 82, icon: 'bi-cloud-arrow-up-fill' },
    { id: 'skill-18', name: 'CI/CD', category: SkillCategory.DEVOPS, level: 88, icon: 'bi-arrow-repeat' }
  ];

  // ==================== TIMELINE DATA ====================
  private timeline: TimelineItem[] = [
    {
      id: 'timeline-1',
      date: '2024',
      title: 'Diploma en Full Stack Development',
      subtitle: 'Certificación Profesional',
      description: 'Especialización en desarrollo full-stack moderno utilizando Next.js, React, Node.js, Docker y TypeScript. Implementación de mejores prácticas y arquitecturas escalables.',
      type: TimelineType.CERTIFICATION,
      icon: 'bi-award-fill'
    },
    {
      id: 'timeline-2',
      date: '2024',
      title: 'Diploma en Software Architecture',
      subtitle: 'Certificación Profesional',
      description: 'Dominio de patrones de diseño como MVC, Microservicios y Clean Architecture. Diseño de sistemas escalables y mantenibles.',
      type: TimelineType.CERTIFICATION,
      icon: 'bi-diagram-3-fill',
      achievements: ['Microservicios', 'Clean Architecture', 'DDD']
    },
    {
      id: 'timeline-3',
      date: '2024',
      title: 'Certificaciones Cloud',
      subtitle: 'AWS & Azure Fundamentals',
      description: 'Conocimientos certificados en arquitecturas cloud con AWS y Azure. Implementación de soluciones serverless y contenedores.',
      type: TimelineType.CERTIFICATION,
      icon: 'bi-cloud-fill'
    },
    {
      id: 'timeline-4',
      date: '2023',
      title: 'Cashier/Settler',
      subtitle: 'Me Llega',
      description: 'Desarrollé scripts VBA para automatizar reportes de conciliación de caja, reduciendo el tiempo de procesamiento en 40%.',
      type: TimelineType.WORK,
      icon: 'bi-briefcase-fill'
    },
    {
      id: 'timeline-5',
      date: '2021-2023',
      title: 'Técnico en Big Data',
      subtitle: 'Formación Técnica',
      description: 'Formación especializada en análisis y manejo de grandes volúmenes de datos.',
      type: TimelineType.EDUCATION,
      icon: 'bi-book-fill'
    },
    {
      id: 'timeline-6',
      date: 'En Progreso',
      title: 'Ingeniería de Software',
      subtitle: 'Universidad UNIVO - 4to Año',
      description: 'Cursando el cuarto año de Ingeniería de Software en UNIVO.',
      type: TimelineType.EDUCATION,
      icon: 'bi-mortarboard-fill'
    }
  ];

  // ==================== SERVICES DATA ====================
  private services: Service[] = [
    {
      id: 'service-1',
      title: 'Desarrollo Frontend',
      description: 'Creación de interfaces modernas y responsive con React, Next.js, Angular y Vue.js.',
      icon: 'bi-laptop',
      features: ['React & Next.js', 'Angular & Vue.js', 'Responsive Design', 'UI/UX Optimization']
    },
    {
      id: 'service-2',
      title: 'Desarrollo Backend',
      description: 'APIs RESTful y GraphQL con Node.js, Spring Boot, .NET y Laravel.',
      icon: 'bi-server',
      features: ['REST APIs', 'GraphQL', 'Microservicios', 'Bases de Datos']
    },
    {
      id: 'service-3',
      title: 'Cloud & DevOps',
      description: 'Despliegue en AWS y Azure. Contenedorización con Docker y Kubernetes.',
      icon: 'bi-cloud',
      features: ['AWS & Azure', 'Docker & K8s', 'CI/CD', 'Automatización']
    },
    {
      id: 'service-4',
      title: 'Desarrollo Mobile',
      description: 'Apps nativas y multiplataforma con Flutter, React Native y Kotlin.',
      icon: 'bi-phone',
      features: ['Flutter', 'React Native', 'iOS & Android', 'Apps Híbridas']
    },
    {
      id: 'service-5',
      title: 'Arquitectura de Software',
      description: 'Diseño de sistemas escalables con patrones MVC, Microservicios y Clean Architecture.',
      icon: 'bi-diagram-3',
      features: ['Clean Architecture', 'Microservicios', 'DDD', 'Design Patterns']
    },
    {
      id: 'service-6',
      title: 'AI & Machine Learning',
      description: 'Integración de IA con Next.js, prototipado con LLMs y análisis de datos.',
      icon: 'bi-robot',
      features: ['AI Integration', 'LLMs', 'Data Analysis', 'ML Models']
    }
  ];

  // ==================== CONTACT INFO ====================
  private contactInfo: ContactInfo = {
    email: 'jonataneliasguevarachicas129@gmail.com',
    phone: '+503 7282-7035',
    location: 'San Miguel, El Salvador',
    availability: 'Lunes - Viernes, 9:00 AM - 6:00 PM',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/JonatanG055', icon: 'bi-github', username: '@JonatanG055' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jonataneguevara', icon: 'bi-linkedin', username: 'Jonatan Guevara' },
      { platform: 'Email', url: 'mailto:jonataneliasguevarachicas129@gmail.com', icon: 'bi-envelope' },
      { platform: 'Teléfono', url: 'tel:72827035', icon: 'bi-telephone' }
    ]
  };

  // ==================== STATS ====================
  private stats: Stat[] = [
    { label: 'Proyectos', value: '4+', icon: 'bi-briefcase', description: 'Proyectos completados' },
    { label: 'Tecnologías', value: '10+', icon: 'bi-code-slash', description: 'Tecnologías dominadas' },
    { label: 'Dedicación', value: '100%', icon: 'bi-heart-fill', description: 'Compromiso con la calidad' },
    { label: 'Experiencia', value: '3+', icon: 'bi-trophy', description: 'Años de experiencia' }
  ];

  // ==================== PUBLIC METHODS ====================
  getProjects(): Observable<Project[]> {
    return of(this.projects).pipe(delay(300));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.projects.filter(p => p.featured)).pipe(delay(300));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id)).pipe(delay(200));
  }

  getSkills(): Observable<Skill[]> {
    return of(this.skills).pipe(delay(200));
  }

  getSkillsByCategory(category: SkillCategory): Observable<Skill[]> {
    return of(this.skills.filter(s => s.category === category)).pipe(delay(200));
  }

  getTimeline(): Observable<TimelineItem[]> {
    return of(this.timeline).pipe(delay(200));
  }

  getServices(): Observable<Service[]> {
    return of(this.services).pipe(delay(200));
  }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo).pipe(delay(100));
  }

  getStats(): Observable<Stat[]> {
    return of(this.stats).pipe(delay(100));
  }

  // Simular envío de formulario de contacto
  submitContactForm(formData: any): Observable<{ success: boolean; message: string }> {
    console.log('Form submitted:', formData);
    return of({ 
      success: true, 
      message: '¡Mensaje enviado exitosamente! Te contactaré pronto.' 
    }).pipe(delay(1000));
  }
}
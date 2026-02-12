import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { CV } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {
  cv: CV | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private cvService: CvService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cvId = this.route.snapshot.params['id'];
    if (cvId) {
      this.loadCV(cvId);
    }
  }

  loadCV(id: number): void {
    this.cvService.getCVById(id).subscribe({
      next: (data) => {
        this.cv = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du CV:', error);
        this.error = 'Impossible de charger le CV';
        this.loading = false;
      }
    });
  }

  printCV(): void {
    window.print();
  }
  editCV(): void {
  if (this.cv?.id) {
    this.router.navigate(['/cv-edit', this.cv.id]);
  }
}
  calculateAge(birthDate: string | undefined): number {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long'
    });
  }
}
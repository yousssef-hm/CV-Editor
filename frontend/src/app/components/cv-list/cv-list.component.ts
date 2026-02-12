import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { CV } from '../../models/models';

@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit {
  cvs: CV[] = [];
  loading = true;
  userId = 1;

  constructor(
    private cvService: CvService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCVs();
  }

  loadCVs(): void {
    this.cvService.getCVsByUserId(this.userId).subscribe({
      next: (data) => {
        this.cvs = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.loading = false;
      }
    });
  }

  viewCV(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/cv-view', id]);
    }
  }
  editCV(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/cv-edit', id]);
    }
  }
  deleteCV(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) {
      this.cvService.deleteCV(id).subscribe({
        next: () => {
          this.cvs = this.cvs.filter(cv => cv.id !== id);
          alert('CV supprimé avec succès');
        },
        error: (error) => {
          console.error('Erreur:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  createNewCV(): void {
    this.router.navigate(['/cv-form']);
  }
}
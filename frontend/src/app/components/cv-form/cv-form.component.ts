import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray
} from '@angular/forms';
import { Router } from '@angular/router';

import { CvService } from '../../services/cv.service';
import { FileUploadService } from '../../services/file-upload.service';
import { CV } from '../../models/models';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit {

  cvForm!: FormGroup;
  currentStep = 1;
  totalSteps = 6;
  userId = 1;

  // 🔥 NOUVEAU : upload photo
  selectedFile: File | null = null;
  photoPreview: string | null = null;
  uploadingPhoto = false;

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.cvForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: [''],
      dateNaissance: [''],
      photoUrl: [''],
      titreCV: [''],
      formations: this.fb.array([]),
      experiences: this.fb.array([]),
      stages: this.fb.array([]),
      langues: this.fb.array([]),
      competences: this.fb.array([])
    });
  }

  // ===== Getters =====
  get formations(): FormArray {
    return this.cvForm.get('formations') as FormArray;
  }

  get experiences(): FormArray {
    return this.cvForm.get('experiences') as FormArray;
  }

  get stages(): FormArray {
    return this.cvForm.get('stages') as FormArray;
  }

  get langues(): FormArray {
    return this.cvForm.get('langues') as FormArray;
  }

  get competences(): FormArray {
    return this.cvForm.get('competences') as FormArray;
  }

  // ===== Ajouts dynamiques =====
  addFormation(): void {
    this.formations.push(this.fb.group({
      intitule: ['', Validators.required],
      etablissement: ['', Validators.required],
      anneeDebut: ['', Validators.required],
      anneeFin: [''],
      description: [''],
      enCours: [false]
    }));
  }

  removeFormation(index: number): void {
    this.formations.removeAt(index);
  }

  addExperience(): void {
    this.experiences.push(this.fb.group({
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      missions: [''],
      enCours: [false],
      lieu: ['']
    }));
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addStage(): void {
    this.stages.push(this.fb.group({
      intitule: ['', Validators.required],
      entreprise: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: [''],
      lieu: ['']
    }));
  }

  removeStage(index: number): void {
    this.stages.removeAt(index);
  }

  addLangue(): void {
    this.langues.push(this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    }));
  }

  removeLangue(index: number): void {
    this.langues.removeAt(index);
  }

  addCompetence(): void {
    this.competences.push(this.fb.group({
      nom: ['', Validators.required],
      niveau: [''],
      categorie: ['']
    }));
  }

  removeCompetence(index: number): void {
    this.competences.removeAt(index);
  }

  // ===== Navigation étapes =====
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  // ===== Upload photo =====
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadPhoto(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        resolve('');
        return;
      }

      this.uploadingPhoto = true;

      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (response) => {
          this.uploadingPhoto = false;
          resolve(response.fileUrl);
        },
        error: (error) => {
          this.uploadingPhoto = false;
          reject(error);
        }
      });
    });
  }

  // ===== Submit =====
  async onSubmit(): Promise<void> {
    if (!this.cvForm.valid) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      if (this.selectedFile) {
        const photoUrl = await this.uploadPhoto();
        this.cvForm.patchValue({ photoUrl });
      }

      const cvData: CV = this.cvForm.value;

      this.cvService.createCV(this.userId, cvData).subscribe({
        next: (response) => {
          alert('CV créé avec succès !');
          this.router.navigate(['/cv-view', response.id]);
        },
        error: (error) => {
          console.error(error);
          alert('Erreur lors de la création du CV');
        }
      });

    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'upload de la photo');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { FileUploadService } from '../../services/file-upload.service';
import { CV } from '../../models/models';

@Component({
  selector: 'app-cv-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.css']
})
export class CvEditComponent implements OnInit {
  cvForm!: FormGroup;
  currentStep = 1;
  totalSteps = 6;
  cvId!: number;
  loading = true;
  
  selectedFile: File | null = null;
  photoPreview: string | null = null;
  uploadingPhoto = false;

  constructor(
    private fb: FormBuilder,
    private cvService: CvService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cvId = Number(this.route.snapshot.params['id']);
    this.initForm();
    this.loadCV();
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

  loadCV(): void {
    this.cvService.getCVById(this.cvId).subscribe({
      next: (cv) => {
        this.patchFormValues(cv);
        this.photoPreview = cv.photoUrl || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du CV:', error);
        alert('Erreur lors du chargement du CV');
        this.loading = false;
      }
    });
  }

  patchFormValues(cv: CV): void {
    this.cvForm.patchValue({
      nom: cv.nom,
      prenom: cv.prenom,
      email: cv.email,
      telephone: cv.telephone,
      adresse: cv.adresse,
      dateNaissance: cv.dateNaissance,
      photoUrl: cv.photoUrl,
      titreCV: cv.titreCV
    });

    // Charger les formations
    if (cv.formations) {
      cv.formations.forEach(formation => {
        this.formations.push(this.fb.group({
          id: [formation.id],
          intitule: [formation.intitule, Validators.required],
          etablissement: [formation.etablissement, Validators.required],
          anneeDebut: [formation.anneeDebut, Validators.required],
          anneeFin: [formation.anneeFin],
          description: [formation.description],
          enCours: [formation.enCours]
        }));
      });
    }

    // Charger les expériences
    if (cv.experiences) {
      cv.experiences.forEach(experience => {
        this.experiences.push(this.fb.group({
          id: [experience.id],
          poste: [experience.poste, Validators.required],
          entreprise: [experience.entreprise, Validators.required],
          dateDebut: [experience.dateDebut, Validators.required],
          dateFin: [experience.dateFin],
          missions: [experience.missions],
          enCours: [experience.enCours],
          lieu: [experience.lieu]
        }));
      });
    }

    // Charger les stages
    if (cv.stages) {
      cv.stages.forEach(stage => {
        this.stages.push(this.fb.group({
          id: [stage.id],
          intitule: [stage.intitule, Validators.required],
          entreprise: [stage.entreprise, Validators.required],
          dateDebut: [stage.dateDebut, Validators.required],
          dateFin: [stage.dateFin, Validators.required],
          description: [stage.description],
          lieu: [stage.lieu]
        }));
      });
    }

    // Charger les langues
    if (cv.langues) {
      cv.langues.forEach(langue => {
        this.langues.push(this.fb.group({
          id: [langue.id],
          nom: [langue.nom, Validators.required],
          niveau: [langue.niveau, Validators.required]
        }));
      });
    }

    // Charger les compétences
    if (cv.competences) {
      cv.competences.forEach(competence => {
        this.competences.push(this.fb.group({
          id: [competence.id],
          nom: [competence.nom, Validators.required],
          niveau: [competence.niveau],
          categorie: [competence.categorie]
        }));
      });
    }
  }

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

  addFormation(): void {
    const formationGroup = this.fb.group({
      intitule: ['', Validators.required],
      etablissement: ['', Validators.required],
      anneeDebut: ['', Validators.required],
      anneeFin: [''],
      description: [''],
      enCours: [false]
    });
    this.formations.push(formationGroup);
  }

  removeFormation(index: number): void {
    this.formations.removeAt(index);
  }

  addExperience(): void {
    const experienceGroup = this.fb.group({
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      missions: [''],
      enCours: [false],
      lieu: ['']
    });
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addStage(): void {
    const stageGroup = this.fb.group({
      intitule: ['', Validators.required],
      entreprise: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      description: [''],
      lieu: ['']
    });
    this.stages.push(stageGroup);
  }

  removeStage(index: number): void {
    this.stages.removeAt(index);
  }

  addLangue(): void {
    const langueGroup = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    });
    this.langues.push(langueGroup);
  }

  removeLangue(index: number): void {
    this.langues.removeAt(index);
  }

  addCompetence(): void {
    const competenceGroup = this.fb.group({
      nom: ['', Validators.required],
      niveau: [''],
      categorie: ['']
    });
    this.competences.push(competenceGroup);
  }

  removeCompetence(index: number): void {
    this.competences.removeAt(index);
  }

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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    
    if (file) {
      this.selectedFile = file;
      
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
          console.log('Photo uploaded:', response);
          resolve(response.fileUrl);
        },
        error: (error) => {
          this.uploadingPhoto = false;
          console.error('Error uploading photo:', error);
          reject(error);
        }
      });
    });
  }

  async onSubmit(): Promise<void> {
    if (this.cvForm.valid) {
      try {
        // Upload de la photo si une nouvelle a été sélectionnée
        if (this.selectedFile) {
          const photoUrl = await this.uploadPhoto();
          this.cvForm.patchValue({ photoUrl: photoUrl });
        }

        const cvData: CV = this.cvForm.value;
        
        this.cvService.updateCV(this.cvId, cvData).subscribe({
          next: (response) => {
            console.log('CV modifié avec succès:', response);
            alert('CV modifié avec succès!');
            this.router.navigate(['/cv-view', this.cvId]);
          },
          error: (error) => {
            console.error('Erreur lors de la modification du CV:', error);
            alert('Erreur lors de la modification du CV');
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'upload de la photo:', error);
        alert('Erreur lors de l\'upload de la photo');
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }
}
import { Routes } from '@angular/router';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { CvFormComponent } from './components/cv-form/cv-form.component';
import { CvViewComponent } from './components/cv-view/cv-view.component';
import { CvEditComponent } from './components/cv-edit/cv-edit.component';

export const routes: Routes = [
  { path: '', component: CvListComponent },
  { path: 'cv-form', component: CvFormComponent },
  { path: 'cv-edit/:id', component: CvEditComponent },
  { path: 'cv-view/:id', component: CvViewComponent },
  { path: '**', redirectTo: '' }
];
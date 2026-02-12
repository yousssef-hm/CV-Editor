export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CV {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  dateNaissance?: string;
  photoUrl?: string;
  titreCV?: string;
  userId?: number;
  formations?: Formation[];
  experiences?: Experience[];
  stages?: Stage[];
  langues?: Langue[];
  competences?: Competence[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Formation {
  id?: number;
  intitule: string;
  etablissement: string;
  anneeDebut: number;
  anneeFin?: number;
  description?: string;
  enCours?: boolean;
}

export interface Experience {
  id?: number;
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin?: string;
  missions?: string;
  enCours?: boolean;
  lieu?: string;
}

export interface Stage {
  id?: number;
  intitule: string;
  entreprise: string;
  dateDebut: string;
  dateFin: string;
  description?: string;
  lieu?: string;
}

export interface Langue {
  id?: number;
  nom: string;
  niveau: string;
}

export interface Competence {
  id?: number;
  nom: string;
  niveau?: number;
  categorie?: string;
}
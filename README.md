# 📋 CV Editor - Application de Gestion de CV en Ligne

## 📖 Description

**CV Editor** est une application web full-stack permettant aux utilisateurs de créer, modifier, visualiser et gérer leurs CV de manière professionnelle en ligne. L'application offre une interface intuitive avec un formulaire multi-étapes et génère des CV au format professionnel.

---

## 🏗️ Architecture du Projet

### **Vue d'ensemble**

```
CV-EDITOR-PROJECT/
│
├── backend/                    # API REST Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/cv/backend/
│   │       │       ├── config/          # Configurations (CORS, Upload)
│   │       │       ├── controller/      # Contrôleurs REST
│   │       │       ├── dto/             # Data Transfer Objects
│   │       │       ├── model/           # Entités JPA
│   │       │       ├── repository/      # Repositories Spring Data
│   │       │       ├── service/         # Logique métier
│   │       │       └── CvEditorApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── uploads/                # Dossier de stockage des photos
│   └── pom.xml                 # Dépendances Maven
│
├── frontend/                   # Application Angular 17
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Composants Angular
│   │   │   │   ├── cv-list/    # Liste des CVs
│   │   │   │   ├── cv-form/    # Création de CV
│   │   │   │   ├── cv-edit/    # Modification de CV
│   │   │   │   └── cv-view/    # Visualisation de CV
│   │   │   ├── services/       # Services HTTP
│   │   │   │   ├── cv.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── file-upload.service.ts
│   │   │   ├── models/         # Interfaces TypeScript
│   │   │   └── app.routes.ts   # Configuration du routing
│   │   ├── assets/             # Ressources statiques
│   │   └── styles.css          # Styles globaux
│   ├── angular.json
│   └── package.json
│
└── database/
    └── init-database.sql       # Script d'initialisation BDD
```

---

### **Architecture Technique**

#### **Backend - Spring Boot**

**Technologies utilisées :**
- **Framework** : Spring Boot 3.2.0
- **Langage** : Java 17+
- **Base de données** : MySQL 8.0+
- **API** : RESTful avec JSON
- **Upload de fichiers** : Spring MultipartFile
- **Port** : 8080

**Couches de l'application :**

1. **Controller Layer** (Présentation)
   - `CVController` : Gestion des CVs
   - `UserController` : Gestion des utilisateurs
   - `FileDownloadController` : Téléchargement de photos

2. **Service Layer** (Logique métier)
   - `CVService` : Opérations CRUD sur les CVs
   - `UserService` : Gestion des utilisateurs
   - `FileStorageService` : Stockage de fichiers

3. **Repository Layer** (Accès aux données)
   - `CVRepository`
   - `UserRepository`
   - `FormationRepository`
   - `ExperienceRepository`
   - `StageRepository`
   - `LangueRepository`
   - `CompetenceRepository`

4. **Model Layer** (Entités JPA)
   - `User` : Utilisateur
   - `CV` : Curriculum Vitae
   - `Formation` : Formation académique
   - `Experience` : Expérience professionnelle
   - `Stage` : Stage
   - `Langue` : Langue parlée
   - `Competence` : Compétence technique/soft


#### **Frontend - Angular 17**

**Technologies utilisées :**
- **Framework** : Angular 17 (Standalone Components)
- **Langage** : TypeScript 5.2+
- **UI/UX** : CSS3 personnalisé avec gradients
- **HTTP** : HttpClient avec RxJS
- **Routing** : Angular Router
- **Port** : 4200

**Composants principaux :**

1. **cv-list** : Page d'accueil affichant tous les CVs
   - Grille responsive de cartes de CV
   - Boutons : Voir, Modifier, Supprimer

2. **cv-form** : Formulaire de création de CV
   - 6 étapes : Infos personnelles, Formations, Expériences, Stages, Langues, Compétences
   - Upload de photo avec prévisualisation
   - Validation des champs obligatoires

3. **cv-edit** : Formulaire de modification de CV
   - Pré-remplissage des données existantes
   - Même structure que cv-form
   - Mise à jour de la photo

4. **cv-view** : Visualisation professionnelle du CV
   - Layout professionnel type "template CV"
   - Fonctionnalité d'impression/export PDF
   - Bouton de modification

**Services Angular :**

- **CvService** : Communication avec l'API backend pour les CVs
- **UserService** : Gestion des utilisateurs
- **FileUploadService** : Upload de photos vers le serveur

---

## 🚀 Installation et Démarrage

### **Prérequis**

Avant de commencer, assurez-vous d'avoir installé :

- **Java JDK 17+** : [Download](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- **Maven 3.8+** : [Download](https://maven.apache.org/download.cgi)
- **Node.js 18+** : [Download](https://nodejs.org/)
- **Angular CLI 17** : `npm install -g @angular/cli`
- **MySQL 8.0+** : [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** : [Download](https://git-scm.com/)

---

### **Étape 1 : Configuration de la Base de Données**

#### **1.1 Démarrer MySQL**

```bash
# Windows : Démarrer MySQL via XAMPP ou le service Windows
# Linux/Mac
sudo service mysql start
```

#### **1.2 Créer la base de données**

Connectez-vous à MySQL :

```bash
- mysql -u root -p
```

Créez la base de données :

```sql
CREATE DATABASE cv_editor_db;
USE cv_editor_db;
```

#### **1.3 Importer le script SQL**

Option 1 - Dans MySQL :

```sql
SOURCE /chemin/vers/init-database.sql;
```

Option 2 - En ligne de commande :

```bash
mysql -u root -p cv_editor_db < database/init-database.sql
```

#### **1.4 Vérifier l'importation**

```sql
SHOW TABLES;
SELECT * FROM users;
```

Vous devriez voir 7 tables et 2 utilisateurs de test.

---

### **Étape 2 : Configuration et Démarrage du Backend**

#### **2.1 Naviguer vers le dossier backend**

```bash
- cd backend
```

#### **2.2 Configurer application.properties**

Ouvrez `src/main/resources/application.properties` et vérifiez :

```properties
# MySQL - Modifiez si nécessaire
spring.datasource.url=jdbc:mysql://localhost:3306/cv_editor_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=     # Votre mot de passe MySQL (vide par défaut sur XAMPP)
```

#### **2.3 Créer le dossier uploads**

```bash
# À la racine du projet backend
- mkdir uploads
```

La structure doit être :

```
backend/
├── uploads/          ← ICI
├── src/
└── pom.xml
```

#### **2.4 Installer les dépendances Maven**

```bash
- mvn clean install
```

#### **2.5 Démarrer le serveur Spring Boot**

```bash
- mvn spring-boot:run
```

**OU** depuis votre IDE (IntelliJ IDEA, Eclipse) :
- Clic droit sur `CvEditorApplication.java`
- Run `CvEditorApplication`

**Vérification** : Vous devriez voir dans la console :

```
====================================
CV Editor Backend Started!
API disponible sur: http://localhost:8080/api
Files disponibles sur: http://localhost:8080/api/files
====================================
```

#### **2.6 Tester l'API**

Ouvrez votre navigateur et allez sur :

```
http://localhost:8080/api/users
```

Vous devriez voir la liste des utilisateurs en JSON.

---

### **Étape 3 : Configuration et Démarrage du Frontend**

#### **3.1 Naviguer vers le dossier frontend**

Ouvrez un **NOUVEAU terminal** (gardez le backend qui tourne) :

```bash
- cd frontend
```

#### **3.2 Installer les dépendances npm**

```bash
- npm install
```

Cela peut prendre quelques minutes.

#### **3.3 Démarrer le serveur de développement Angular**
```bash
- ng serve
```

**OU**

```bash
- npm start
```

**Vérification** : Vous devriez voir dans la console :

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

#### **3.4 Accéder à l'application**

Ouvrez votre navigateur et allez sur :

```
http://localhost:4200
```

Vous devriez voir la page d'accueil avec la liste des CVs ! 🎉

---

## 📚 Utilisation de l'Application

### **1. Créer un nouveau CV**

1. Cliquez sur **"+ Créer un nouveau CV"**
2. Remplissez le formulaire en 6 étapes :
   - **Étape 1** : Informations personnelles + Photo
   - **Étape 2** : Formations académiques
   - **Étape 3** : Expériences professionnelles
   - **Étape 4** : Stages
   - **Étape 5** : Langues parlées
   - **Étape 6** : Compétences techniques
3. Cliquez sur **"Créer le CV"**

### **2. Visualiser un CV**

1. Cliquez sur le bouton **"👁️ Voir"** sur une carte de CV
2. Vous verrez une visualisation professionnelle
3. Cliquez sur **"🖨️ Imprimer / PDF"** pour exporter

### **3. Modifier un CV**

1. Cliquez sur le bouton **"✏️ Modifier"** (sur la liste ou dans la vue)
2. Le formulaire se pré-remplit avec les données existantes
3. Modifiez les informations souhaitées
4. Cliquez sur **"✓ Enregistrer les modifications"**

### **4. Supprimer un CV**

1. Cliquez sur le bouton **"🗑️ Supprimer"** sur une carte de CV
2. Confirmez la suppression

### **5. Upload de photo**

- Lors de la création/modification d'un CV
- Cliquez sur **"📷 Choisir une photo"**
- Sélectionnez une image (JPG, PNG, GIF)
- L'aperçu s'affiche immédiatement
- La photo est uploadée lors de la sauvegarde

---

## 📊 API REST - Endpoints Principaux

### **Users**

```
GET    /api/users              # Liste des utilisateurs
POST   /api/users              # Créer un utilisateur
GET    /api/users/{id}         # Détails d'un utilisateur
```

### **CVs**

```
GET    /api/cvs/user/{userId}  # CVs d'un utilisateur
GET    /api/cvs/{id}           # Détails d'un CV
POST   /api/cvs/user/{userId}  # Créer un CV
PUT    /api/cvs/{id}           # Modifier un CV
DELETE /api/cvs/{id}           # Supprimer un CV
```

### **Upload de fichiers**

```
POST   /api/files/upload       # Upload une photo
GET    /api/files/{filename}   # Télécharger une photo
DELETE /api/files/{filename}   # Supprimer une photo
```

---

## 👨‍💻 Auteur

**HMAMA Youssef**
- Email: youssefhmama1@gmail.com
- Projet réalisé dans le cadre d'un exercice de développement full-stack

---

**Bon développement ! 🚀**

-- =============================================
-- Script d'initialisation de la base de données
-- Projet : CV Editor
-- Date : Février 2026
-- =============================================

-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS cv_editor_db;
USE cv_editor_db;

-- =============================================
-- Suppression des tables existantes (pour réinitialisation)
-- =============================================

DROP TABLE IF EXISTS competences;
DROP TABLE IF EXISTS langues;
DROP TABLE IF EXISTS stages;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS formations;
DROP TABLE IF EXISTS cvs;
DROP TABLE IF EXISTS users;

-- =============================================
-- Table : users (Utilisateurs)
-- =============================================

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table : cvs (Curriculum Vitae)
-- =============================================

CREATE TABLE cvs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    adresse TEXT,
    date_naissance DATE,
    photo_url VARCHAR(500),
    titre_cv VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table : formations (Formations académiques)
-- =============================================

CREATE TABLE formations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cv_id BIGINT NOT NULL,
    intitule VARCHAR(200) NOT NULL,
    etablissement VARCHAR(200) NOT NULL,
    annee_debut INT NOT NULL,
    annee_fin INT,
    description TEXT,
    en_cours BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    INDEX idx_cv_id (cv_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table : experiences (Expériences professionnelles)
-- =============================================

CREATE TABLE experiences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cv_id BIGINT NOT NULL,
    poste VARCHAR(200) NOT NULL,
    entreprise VARCHAR(200) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    missions TEXT,
    en_cours BOOLEAN DEFAULT FALSE,
    lieu VARCHAR(200),
    
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    INDEX idx_cv_id (cv_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table : stages
-- =============================================

CREATE TABLE stages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cv_id BIGINT NOT NULL,
    intitule VARCHAR(200) NOT NULL,
    entreprise VARCHAR(200) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    description TEXT,
    lieu VARCHAR(200),
    
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    INDEX idx_cv_id (cv_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table : langues
-- =============================================

CREATE TABLE langues (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cv_id BIGINT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    niveau VARCHAR(50) NOT NULL,
    
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    INDEX idx_cv_id (cv_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Table : competences
-- =============================================

CREATE TABLE competences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cv_id BIGINT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    niveau INT,
    categorie VARCHAR(100),
    
    FOREIGN KEY (cv_id) REFERENCES cvs(id) ON DELETE CASCADE,
    INDEX idx_cv_id (cv_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Données de test
-- =============================================

-- Insertion d'utilisateurs de test
INSERT INTO users (nom, prenom, email) VALUES
('YOUSSEF', 'HMAMA', 'youssefhmama1@gmail.com'),
('MARTIN', 'Sophie', 'sophie.martin@email.com');

-- Insertion d'un CV de test pour l'utilisateur 1
INSERT INTO cvs (user_id, nom, prenom, email, telephone, adresse, date_naissance, titre_cv) VALUES
(1, 'YOUSSEF', 'HMAMA', 'youssefhmama2221@gmail.com', '0624243433', 'EL Aandalous', '2003-10-25', 'Etudiant En Bachelor');

-- Insertion de formations pour le CV 1
INSERT INTO formations (cv_id, intitule, etablissement, annee_debut, annee_fin, description, en_cours) VALUES
(1, 'Bachelor en Informatique', 'Université Mohamed Premier', 2021, 2024, 'Formation en développement logiciel et bases de données', FALSE),
(1, 'Baccalauréat Sciences Mathématiques', 'Lycée Hassan II', 2020, 2021, 'Option sciences mathématiques avec mention bien', FALSE);

-- Insertion d'une expérience pour le CV 1
INSERT INTO experiences (cv_id, poste, entreprise, date_debut, date_fin, missions, en_cours, lieu) VALUES
(1, 'Développeur Web Junior', 'TechSolutions', '2023-06-01', '2023-12-31', 'Développement d\'applications web avec Angular et Spring Boot\nMaintenance et amélioration de sites existants\nTravail en équipe agile', FALSE, 'Oujda, Maroc');

-- Insertion de langues pour le CV 1
INSERT INTO langues (cv_id, nom, niveau) VALUES
(1, 'Français', 'Courant'),
(1, 'Arabe', 'Langue maternelle'),
(1, 'Anglais', 'Intermédiaire');

-- Insertion de compétences pour le CV 1
INSERT INTO competences (cv_id, nom, niveau, categorie) VALUES
(1, 'Java', 4, 'Technique'),
(1, 'Spring Boot', 4, 'Technique'),
(1, 'Angular', 3, 'Technique'),
(1, 'MySQL', 4, 'Technique'),
(1, 'Git', 3, 'Technique'),
(1, 'Travail en équipe', 5, 'Soft Skills'),
(1, 'Communication', 4, 'Soft Skills');

-- =============================================
-- Vérification des données insérées
-- =============================================

-- Afficher tous les utilisateurs
SELECT 'UTILISATEURS :' AS '';
SELECT * FROM users;

-- Afficher tous les CVs
SELECT '' AS '';
SELECT 'CVs :' AS '';
SELECT id, nom, prenom, email, titre_cv FROM cvs;

-- Afficher le nombre d'éléments par CV
SELECT '' AS '';
SELECT 'STATISTIQUES PAR CV :' AS '';
SELECT 
    c.id AS cv_id,
    CONCAT(c.prenom, ' ', c.nom) AS proprietaire,
    COUNT(DISTINCT f.id) AS nb_formations,
    COUNT(DISTINCT e.id) AS nb_experiences,
    COUNT(DISTINCT s.id) AS nb_stages,
    COUNT(DISTINCT l.id) AS nb_langues,
    COUNT(DISTINCT co.id) AS nb_competences
FROM cvs c
LEFT JOIN formations f ON c.id = f.cv_id
LEFT JOIN experiences e ON c.id = e.cv_id
LEFT JOIN stages s ON c.id = s.cv_id
LEFT JOIN langues l ON c.id = l.cv_id
LEFT JOIN competences co ON c.id = co.cv_id
GROUP BY c.id;

-- =============================================
-- Requêtes utiles pour les tests
-- =============================================

-- Pour voir tous les détails d'un CV spécifique (ID = 1)
/*
SELECT 'CV COMPLET :' AS '';
SELECT * FROM cvs WHERE id = 1;
SELECT 'Formations :' AS ''; SELECT * FROM formations WHERE cv_id = 1;
SELECT 'Expériences :' AS ''; SELECT * FROM experiences WHERE cv_id = 1;
SELECT 'Stages :' AS ''; SELECT * FROM stages WHERE cv_id = 1;
SELECT 'Langues :' AS ''; SELECT * FROM langues WHERE cv_id = 1;
SELECT 'Compétences :' AS ''; SELECT * FROM competences WHERE cv_id = 1;
*/

-- Pour supprimer un CV et toutes ses données liées (CASCADE)
-- DELETE FROM cvs WHERE id = 1;

-- Pour ajouter un nouveau CV
/*
INSERT INTO cvs (user_id, nom, prenom, email, telephone, titre_cv) 
VALUES (1, 'DUPONT', 'Jean', 'jean.dupont@email.com', '0612345678', 'Développeur Full Stack');
*/

-- =============================================
-- FIN DU SCRIPT
-- =============================================

SELECT '' AS '';
SELECT '✅ Base de données initialisée avec succès !' AS 'STATUT';
SELECT '' AS '';

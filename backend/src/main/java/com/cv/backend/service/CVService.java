package com.cv.backend.service;

import com.cv.backend.dto.*;
import com.cv.backend.model.*;
import com.cv.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private LangueRepository langueRepository;

    @Autowired
    private CompetenceRepository competenceRepository;

    public CVDto createCV(CVDto cvDto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CV cv = new CV();
        cv.setNom(cvDto.getNom());
        cv.setPrenom(cvDto.getPrenom());
        cv.setEmail(cvDto.getEmail());
        cv.setTelephone(cvDto.getTelephone());
        cv.setAdresse(cvDto.getAdresse());
        cv.setDateNaissance(cvDto.getDateNaissance());
        cv.setPhotoUrl(cvDto.getPhotoUrl());
        cv.setTitreCV(cvDto.getTitreCV());
        cv.setUser(user);

        CV savedCV = cvRepository.save(cv);

        // Sauvegarder les formations
        if (cvDto.getFormations() != null) {
            for (FormationDto formationDto : cvDto.getFormations()) {
                Formation formation = new Formation();
                formation.setIntitule(formationDto.getIntitule());
                formation.setEtablissement(formationDto.getEtablissement());
                formation.setAnneeDebut(formationDto.getAnneeDebut());
                formation.setAnneeFin(formationDto.getAnneeFin());
                formation.setDescription(formationDto.getDescription());
                formation.setEnCours(formationDto.getEnCours());
                formation.setCv(savedCV);
                formationRepository.save(formation);
            }
        }

        // Sauvegarder les expériences
        if (cvDto.getExperiences() != null) {
            for (ExperienceDto experienceDto : cvDto.getExperiences()) {
                Experience experience = new Experience();
                experience.setPoste(experienceDto.getPoste());
                experience.setEntreprise(experienceDto.getEntreprise());
                experience.setDateDebut(experienceDto.getDateDebut());
                experience.setDateFin(experienceDto.getDateFin());
                experience.setMissions(experienceDto.getMissions());
                experience.setEnCours(experienceDto.getEnCours());
                experience.setLieu(experienceDto.getLieu());
                experience.setCv(savedCV);
                experienceRepository.save(experience);
            }
        }

        // Sauvegarder les stages
        if (cvDto.getStages() != null) {
            for (StageDto stageDto : cvDto.getStages()) {
                Stage stage = new Stage();
                stage.setIntitule(stageDto.getIntitule());
                stage.setEntreprise(stageDto.getEntreprise());
                stage.setDateDebut(stageDto.getDateDebut());
                stage.setDateFin(stageDto.getDateFin());
                stage.setDescription(stageDto.getDescription());
                stage.setLieu(stageDto.getLieu());
                stage.setCv(savedCV);
                stageRepository.save(stage);
            }
        }

        // Sauvegarder les langues
        if (cvDto.getLangues() != null) {
            for (LangueDto langueDto : cvDto.getLangues()) {
                Langue langue = new Langue();
                langue.setNom(langueDto.getNom());
                langue.setNiveau(langueDto.getNiveau());
                langue.setCv(savedCV);
                langueRepository.save(langue);
            }
        }

        // Sauvegarder les compétences
        if (cvDto.getCompetences() != null) {
            for (CompetenceDto competenceDto : cvDto.getCompetences()) {
                Competence competence = new Competence();
                competence.setNom(competenceDto.getNom());
                competence.setNiveau(competenceDto.getNiveau());
                competence.setCategorie(competenceDto.getCategorie());
                competence.setCv(savedCV);
                competenceRepository.save(competence);
            }
        }

        return getCVById(savedCV.getId());
    }

    public CVDto getCVById(Long id) {
        CV cv = cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV not found"));
        return convertToDto(cv);
    }

    public List<CVDto> getCVsByUserId(Long userId) {
        return cvRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CVDto updateCV(Long id, CVDto cvDto) {
        CV cv = cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV not found"));

        cv.setNom(cvDto.getNom());
        cv.setPrenom(cvDto.getPrenom());
        cv.setEmail(cvDto.getEmail());
        cv.setTelephone(cvDto.getTelephone());
        cv.setAdresse(cvDto.getAdresse());
        cv.setDateNaissance(cvDto.getDateNaissance());
        cv.setPhotoUrl(cvDto.getPhotoUrl());
        cv.setTitreCV(cvDto.getTitreCV());

        CV updatedCV = cvRepository.save(cv);
        return convertToDto(updatedCV);
    }

    public void deleteCV(Long id) {
        cvRepository.deleteById(id);
    }

    public FormationDto addFormation(Long cvId, FormationDto formationDto) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Formation formation = new Formation();
        formation.setIntitule(formationDto.getIntitule());
        formation.setEtablissement(formationDto.getEtablissement());
        formation.setAnneeDebut(formationDto.getAnneeDebut());
        formation.setAnneeFin(formationDto.getAnneeFin());
        formation.setDescription(formationDto.getDescription());
        formation.setEnCours(formationDto.getEnCours());
        formation.setCv(cv);

        Formation saved = formationRepository.save(formation);
        return convertFormationToDto(saved);
    }

    public ExperienceDto addExperience(Long cvId, ExperienceDto experienceDto) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Experience experience = new Experience();
        experience.setPoste(experienceDto.getPoste());
        experience.setEntreprise(experienceDto.getEntreprise());
        experience.setDateDebut(experienceDto.getDateDebut());
        experience.setDateFin(experienceDto.getDateFin());
        experience.setMissions(experienceDto.getMissions());
        experience.setEnCours(experienceDto.getEnCours());
        experience.setLieu(experienceDto.getLieu());
        experience.setCv(cv);

        Experience saved = experienceRepository.save(experience);
        return convertExperienceToDto(saved);
    }

    public StageDto addStage(Long cvId, StageDto stageDto) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Stage stage = new Stage();
        stage.setIntitule(stageDto.getIntitule());
        stage.setEntreprise(stageDto.getEntreprise());
        stage.setDateDebut(stageDto.getDateDebut());
        stage.setDateFin(stageDto.getDateFin());
        stage.setDescription(stageDto.getDescription());
        stage.setLieu(stageDto.getLieu());
        stage.setCv(cv);

        Stage saved = stageRepository.save(stage);
        return convertStageToDto(saved);
    }

    public LangueDto addLangue(Long cvId, LangueDto langueDto) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Langue langue = new Langue();
        langue.setNom(langueDto.getNom());
        langue.setNiveau(langueDto.getNiveau());
        langue.setCv(cv);

        Langue saved = langueRepository.save(langue);
        return convertLangueToDto(saved);
    }

    public CompetenceDto addCompetence(Long cvId, CompetenceDto competenceDto) {
        CV cv = cvRepository.findById(cvId)
                .orElseThrow(() -> new RuntimeException("CV not found"));

        Competence competence = new Competence();
        competence.setNom(competenceDto.getNom());
        competence.setNiveau(competenceDto.getNiveau());
        competence.setCategorie(competenceDto.getCategorie());
        competence.setCv(cv);

        Competence saved = competenceRepository.save(competence);
        return convertCompetenceToDto(saved);
    }

    private CVDto convertToDto(CV cv) {
        CVDto dto = new CVDto();
        dto.setId(cv.getId());
        dto.setNom(cv.getNom());
        dto.setPrenom(cv.getPrenom());
        dto.setEmail(cv.getEmail());
        dto.setTelephone(cv.getTelephone());
        dto.setAdresse(cv.getAdresse());
        dto.setDateNaissance(cv.getDateNaissance());
        dto.setPhotoUrl(cv.getPhotoUrl());
        dto.setTitreCV(cv.getTitreCV());
        dto.setUserId(cv.getUser().getId());

        dto.setFormations(cv.getFormations().stream()
                .map(this::convertFormationToDto).collect(Collectors.toList()));
        dto.setExperiences(cv.getExperiences().stream()
                .map(this::convertExperienceToDto).collect(Collectors.toList()));
        dto.setStages(cv.getStages().stream()
                .map(this::convertStageToDto).collect(Collectors.toList()));
        dto.setLangues(cv.getLangues().stream()
                .map(this::convertLangueToDto).collect(Collectors.toList()));
        dto.setCompetences(cv.getCompetences().stream()
                .map(this::convertCompetenceToDto).collect(Collectors.toList()));

        return dto;
    }

    private FormationDto convertFormationToDto(Formation formation) {
        FormationDto dto = new FormationDto();
        dto.setId(formation.getId());
        dto.setIntitule(formation.getIntitule());
        dto.setEtablissement(formation.getEtablissement());
        dto.setAnneeDebut(formation.getAnneeDebut());
        dto.setAnneeFin(formation.getAnneeFin());
        dto.setDescription(formation.getDescription());
        dto.setEnCours(formation.getEnCours());
        return dto;
    }

    private ExperienceDto convertExperienceToDto(Experience experience) {
        ExperienceDto dto = new ExperienceDto();
        dto.setId(experience.getId());
        dto.setPoste(experience.getPoste());
        dto.setEntreprise(experience.getEntreprise());
        dto.setDateDebut(experience.getDateDebut());
        dto.setDateFin(experience.getDateFin());
        dto.setMissions(experience.getMissions());
        dto.setEnCours(experience.getEnCours());
        dto.setLieu(experience.getLieu());
        return dto;
    }

    private StageDto convertStageToDto(Stage stage) {
        StageDto dto = new StageDto();
        dto.setId(stage.getId());
        dto.setIntitule(stage.getIntitule());
        dto.setEntreprise(stage.getEntreprise());
        dto.setDateDebut(stage.getDateDebut());
        dto.setDateFin(stage.getDateFin());
        dto.setDescription(stage.getDescription());
        dto.setLieu(stage.getLieu());
        return dto;
    }

    private LangueDto convertLangueToDto(Langue langue) {
        LangueDto dto = new LangueDto();
        dto.setId(langue.getId());
        dto.setNom(langue.getNom());
        dto.setNiveau(langue.getNiveau());
        return dto;
    }

    private CompetenceDto convertCompetenceToDto(Competence competence) {
        CompetenceDto dto = new CompetenceDto();
        dto.setId(competence.getId());
        dto.setNom(competence.getNom());
        dto.setNiveau(competence.getNiveau());
        dto.setCategorie(competence.getCategorie());
        return dto;
    }
}
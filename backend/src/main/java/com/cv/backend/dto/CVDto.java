package com.cv.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CVDto {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String adresse;
    private LocalDate dateNaissance;
    private String photoUrl;
    private String titreCV;
    private Long userId;

    private List<FormationDto> formations;
    private List<ExperienceDto> experiences;
    private List<StageDto> stages;
    private List<LangueDto> langues;
    private List<CompetenceDto> competences;
}
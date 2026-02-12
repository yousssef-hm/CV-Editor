package com.cv.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormationDto {
    private Long id;
    private String intitule;
    private String etablissement;
    private Integer anneeDebut;
    private Integer anneeFin;
    private String description;
    private Boolean enCours;
}
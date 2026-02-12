package com.cv.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageDto {
    private Long id;
    private String intitule;
    private String entreprise;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String description;
    private String lieu;
}
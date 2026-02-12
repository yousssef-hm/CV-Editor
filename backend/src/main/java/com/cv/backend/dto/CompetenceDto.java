package com.cv.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompetenceDto {
    private Long id;
    private String nom;
    private Integer niveau;
    private String categorie;
}
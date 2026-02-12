package com.cv.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LangueDto {
    private Long id;
    private String nom;
    private String niveau;
}
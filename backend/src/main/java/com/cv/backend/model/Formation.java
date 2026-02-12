package com.cv.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "formations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String intitule;

    @Column(nullable = false)
    private String etablissement;

    @Column(name = "annee_debut", nullable = false)
    private Integer anneeDebut;

    @Column(name = "annee_fin")
    private Integer anneeFin;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "en_cours")
    private Boolean enCours = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_id", nullable = false)
    @JsonIgnore
    private CV cv;
}
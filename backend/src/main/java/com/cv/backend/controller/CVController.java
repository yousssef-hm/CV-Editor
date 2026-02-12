package com.cv.backend.controller;

import com.cv.backend.dto.*;
import com.cv.backend.service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cvs")
@CrossOrigin(origins = "http://localhost:4200")
public class CVController {

    @Autowired
    private CVService cvService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<CVDto> createCV(@PathVariable Long userId, @RequestBody CVDto cvDto) {
        CVDto created = cvService.createCV(cvDto, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CVDto> getCVById(@PathVariable Long id) {
        CVDto cv = cvService.getCVById(id);
        return ResponseEntity.ok(cv);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CVDto>> getCVsByUserId(@PathVariable Long userId) {
        List<CVDto> cvs = cvService.getCVsByUserId(userId);
        return ResponseEntity.ok(cvs);
    }


    @PutMapping("/{id}")
    public ResponseEntity<CVDto> updateCV(@PathVariable Long id, @RequestBody CVDto cvDto) {
        CVDto updated = cvService.updateCV(id, cvDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCV(@PathVariable Long id) {
        cvService.deleteCV(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{cvId}/formations")
    public ResponseEntity<FormationDto> addFormation(@PathVariable Long cvId, @RequestBody FormationDto formationDto) {
        FormationDto created = cvService.addFormation(cvId, formationDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/{cvId}/experiences")
    public ResponseEntity<ExperienceDto> addExperience(@PathVariable Long cvId, @RequestBody ExperienceDto experienceDto) {
        ExperienceDto created = cvService.addExperience(cvId, experienceDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/{cvId}/stages")
    public ResponseEntity<StageDto> addStage(@PathVariable Long cvId, @RequestBody StageDto stageDto) {
        StageDto created = cvService.addStage(cvId, stageDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/{cvId}/langues")
    public ResponseEntity<LangueDto> addLangue(@PathVariable Long cvId, @RequestBody LangueDto langueDto) {
        LangueDto created = cvService.addLangue(cvId, langueDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/{cvId}/competences")
    public ResponseEntity<CompetenceDto> addCompetence(@PathVariable Long cvId, @RequestBody CompetenceDto competenceDto) {
        CompetenceDto created = cvService.addCompetence(cvId, competenceDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
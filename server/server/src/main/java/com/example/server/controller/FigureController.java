package com.example.server.controller;

import com.example.server.dto.FigureDTO;
import com.example.server.model.Figure;
import com.example.server.service.FigureService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.server.service.R2Service;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/figures")
public class FigureController {

    private final FigureService figureService;
    private final R2Service r2Service;


    @Autowired
    public FigureController(FigureService figureService, R2Service r2Service) {
        this.figureService = figureService;
        this.r2Service = r2Service;
    }

    @GetMapping
    public List<FigureDTO> getAll() {
        return figureService.findAll().stream()
                .map(figureService::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FigureDTO> getById(@PathVariable Long id) {
        return figureService.findById(id)
                .map(figureService::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FigureDTO> create(@Valid @RequestBody FigureDTO dto) {
        Figure figure = figureService.fromDTO(dto);
        Figure saved = figureService.save(figure);
        System.out.println("DTO recibido: " + dto);
        return ResponseEntity.ok(figureService.toDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FigureDTO> update(@PathVariable Long id, @Valid @RequestBody FigureDTO dto) {
        Figure updated = figureService.fromDTO(dto);
        Figure saved = figureService.update(id, updated);
        return ResponseEntity.ok(figureService.toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        figureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile ( @RequestPart("file") MultipartFile file)  throws IOException { 
        System.out.println("Ejecutando subida de imagen");
        String   url  =    r2Service.uploadFile(file, true );
        System.out.println("Funcionando..." + url); 
        return ResponseEntity.ok( "Archivo subido correctamente a " + url); 
    } 

}

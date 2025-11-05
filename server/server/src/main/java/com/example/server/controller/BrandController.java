package com.example.server.controller;

import com.example.server.dto.BrandDTO;
import com.example.server.model.Brand;
import com.example.server.service.BrandService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public List<BrandDTO> getAll() {
        return brandService.findAll().stream()
                .map(brandService::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDTO> getById(@PathVariable Long id) {
        return brandService.findById(id)
                .map(brandService::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BrandDTO> create(@Valid @RequestBody BrandDTO dto) {
        Brand brand = brandService.fromDTO(dto);
        Brand saved = brandService.save(brand);
        return ResponseEntity.ok(brandService.toDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandDTO> update(@PathVariable Long id, @Valid @RequestBody BrandDTO dto) {
        Brand updated = brandService.fromDTO(dto);
        Brand saved = brandService.update(id, updated);
        return ResponseEntity.ok(brandService.toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

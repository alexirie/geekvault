package com.example.server.controller;

import com.example.server.dto.StoreDTO;
import com.example.server.model.Store;
import com.example.server.service.StoreService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<StoreDTO> getAll() {
        return storeService.findAll().stream()
                .map(storeService::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDTO> getById(@PathVariable Long id) {
        return storeService.findById(id)
                .map(storeService::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StoreDTO> create(@Valid @RequestBody StoreDTO dto) {
        Store store = storeService.fromDTO(dto);
        Store saved = storeService.save(store);
        return ResponseEntity.ok(storeService.toDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreDTO> update(@PathVariable Long id, @Valid @RequestBody StoreDTO dto) {
        Store updated = storeService.fromDTO(dto);
        Store saved = storeService.update(id, updated);
        return ResponseEntity.ok(storeService.toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        storeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.example.server.controller;

import com.example.server.dto.StockDTO;
import com.example.server.model.Stock;
import com.example.server.service.StockService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public List<StockDTO> getAll() {
        return stockService.findAll()
                .stream()
                .map(stockService::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockDTO> getById(@PathVariable Long id) {
        return stockService.findById(id)
                .map(stockService::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StockDTO> create(@Valid @RequestBody StockDTO dto) {
        Stock stock = stockService.fromDTO(dto);
        Stock saved = stockService.save(stock);
        return ResponseEntity.ok(stockService.toDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockDTO> update(@PathVariable Long id, @Valid @RequestBody StockDTO dto) {
        Stock updatedStock = stockService.fromDTO(dto);
        Stock saved = stockService.update(id, updatedStock);
        return ResponseEntity.ok(stockService.toDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        stockService.delete(id);
        return ResponseEntity.noContent().build();
    }
}


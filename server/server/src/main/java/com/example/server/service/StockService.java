package com.example.server.service;

import com.example.server.dto.StockDTO;
import com.example.server.model.Stock;
import com.example.server.repository.StockRepository;
import com.example.server.repository.FigureRepository;
import com.example.server.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final FigureRepository figureRepository;
    private final StoreRepository storeRepository;

    public StockService(StockRepository stockRepository,
                        FigureRepository figureRepository,
                        StoreRepository storeRepository) {
        this.stockRepository = stockRepository;
        this.figureRepository = figureRepository;
        this.storeRepository = storeRepository;
    }

    // --------------------
    // CRUD básicos
    // --------------------

    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    public Optional<Stock> findById(Long id) {
        return stockRepository.findById(id);
    }

    public Stock save(Stock stock) {
        if (stock.getLastChecked() == null) stock.setLastChecked(LocalDateTime.now());
        return stockRepository.save(stock);
    }

    public Stock saveFromDTO(StockDTO dto) {
        Stock stock = fromDTO(dto);
        return save(stock);
    }

    public Stock update(Long id, Stock stock) {
        return stockRepository.findById(id).map(existing -> {
            existing.setPrice(stock.getPrice());
            existing.setAvailable(stock.getAvailable());
            existing.setProductUrl(stock.getProductUrl());
            existing.setLastChecked(stock.getLastChecked() != null ? stock.getLastChecked() : LocalDateTime.now());
            if (stock.getFigure() != null) existing.setFigure(stock.getFigure());
            if (stock.getStore() != null) existing.setStore(stock.getStore());
            return stockRepository.save(existing);
        }).orElseGet(() -> save(stock));
    }

    public Stock updateFromDTO(Long id, StockDTO dto) {
        Stock stock = fromDTO(dto);
        return update(id, stock);
    }

    public void delete(Long id) {
        stockRepository.deleteById(id);
    }

    // --------------------
    // Conversión DTO ↔ entidad
    // --------------------

    public Stock fromDTO(StockDTO dto) {
        Stock stock = new Stock();
        stock.setId(dto.getId());
        stock.setPrice(dto.getPrice());
        stock.setAvailable(dto.getAvailable());
        stock.setProductUrl(dto.getProductUrl());
        stock.setLastChecked(dto.getLastChecked() != null ? dto.getLastChecked() : LocalDateTime.now());
        stock.setFigure(figureRepository.findById(dto.getFigureId())
                .orElseThrow(() -> new IllegalArgumentException("Figura no encontrada con id: " + dto.getFigureId())));
        stock.setStore(storeRepository.findById(dto.getStoreId())
                .orElseThrow(() -> new IllegalArgumentException("Store no encontrada con id: " + dto.getStoreId())));
        return stock;
    }

    public StockDTO toDTO(Stock stock) {
        StockDTO dto = new StockDTO();
        dto.setId(stock.getId());
        dto.setPrice(stock.getPrice());
        dto.setAvailable(stock.getAvailable());
        dto.setProductUrl(stock.getProductUrl());
        dto.setLastChecked(stock.getLastChecked());
        dto.setFigureId(stock.getFigure().getId());
        dto.setStoreId(stock.getStore().getId());
        //Traer nombres
        dto.setFigureName(stock.getFigure().getName());
        dto.setStoreName(stock.getStore().getName());
        return dto;
    }

    // --------------------
    // Métodos de búsqueda adicionales
    // --------------------

    public List<Stock> findByFigureId(Long figureId) {
        return stockRepository.findByFigureId(figureId);
    }

    public List<Stock> findByStoreId(Long storeId) {
        return stockRepository.findByStoreId(storeId);
    }
}

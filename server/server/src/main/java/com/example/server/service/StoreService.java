package com.example.server.service;

import com.example.server.dto.StoreDTO;
import com.example.server.model.Store;
import com.example.server.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    // --------------------
    // CRUD básicos
    // --------------------

    public List<Store> findAll() {
        return storeRepository.findAll();
    }

    public Optional<Store> findById(Long id) {
        return storeRepository.findById(id);
    }

    public Store save(Store store) {
        return storeRepository.save(store);
    }

    public Store update(Long id, Store store) {
        return storeRepository.findById(id).map(existing -> {
            existing.setName(store.getName());
            return storeRepository.save(existing);
        }).orElseGet(() -> storeRepository.save(store));
    }

    public void delete(Long id) {
        storeRepository.deleteById(id);
    }

    // --------------------
    // Conversión DTO ↔ entidad
    // --------------------

    public Store fromDTO(StoreDTO dto) {
        Store store = new Store();
        store.setId(dto.getId());
        store.setName(dto.getName());
        store.setRegion(dto.getRegion());
        return store;
    }

    public StoreDTO toDTO(Store store) {
        StoreDTO dto = new StoreDTO();
        dto.setId(store.getId());
        dto.setName(store.getName());
        dto.setRegion(store.getRegion());
        return dto;
    }
}

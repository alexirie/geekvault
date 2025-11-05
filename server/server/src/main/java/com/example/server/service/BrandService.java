package com.example.server.service;

import com.example.server.dto.BrandDTO;
import com.example.server.model.Brand;
import com.example.server.repository.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    // --------------------
    // CRUD básicos
    // --------------------

    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    public Optional<Brand> findById(Long id) {
        return brandRepository.findById(id);
    }

    public Brand save(Brand brand) {
        return brandRepository.save(brand);
    }

    public Brand update(Long id, Brand brand) {
        return brandRepository.findById(id).map(existing -> {
            existing.setName(brand.getName());
            return brandRepository.save(existing);
        }).orElseGet(() -> brandRepository.save(brand));
    }

    public void delete(Long id) {
        brandRepository.deleteById(id);
    }

    // --------------------
    // Conversión DTO ↔ entidad
    // --------------------

    public Brand fromDTO(BrandDTO dto) {
        Brand brand = new Brand();
        brand.setId(dto.getId());
        brand.setName(dto.getName());
        return brand;
    }

    public BrandDTO toDTO(Brand brand) {
        BrandDTO dto = new BrandDTO();
        dto.setId(brand.getId());
        dto.setName(brand.getName());
        return dto;
    }
}

package com.example.server.service;

import com.example.server.dto.FigureDTO;
import com.example.server.model.Figure;
import com.example.server.repository.FigureRepository;
import com.example.server.repository.BrandRepository;
import org.springframework.stereotype.Service;
import com.example.server.util.Constantes;

import java.net.URI;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class FigureService {

    private final FigureRepository figureRepository;
    private final BrandRepository brandRepository;

    public FigureService(FigureRepository figureRepository, BrandRepository brandRepository) {
        this.figureRepository = figureRepository;
        this.brandRepository = brandRepository;
    }

    // --------------------
    // CRUD básicos
    // --------------------

    public List<Figure> findAll() {
        return figureRepository.findAll();
    }

    public Optional<Figure> findById(Long id) {
        return figureRepository.findById(id);
    }

    public Figure save(Figure figure) {
        return figureRepository.save(figure);
    }

    public Figure update(Long id, Figure figure) {
        return figureRepository.findById(id).map(existing -> {
            existing.setName(figure.getName());
            existing.setBrand(figure.getBrand());
            return figureRepository.save(existing);
        }).orElseGet(() -> figureRepository.save(figure));
    }

    public void delete(Long id) {
        figureRepository.deleteById(id);
    }

    // --------------------
    // Conversión DTO ↔ entidad
    // --------------------

    public Figure fromDTO(FigureDTO dto) {
        Figure figure = new Figure();
        figure.setId(dto.getId());
        figure.setName(dto.getName());
        figure.setBrand(brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Brand no encontrada con id: " + dto.getBrandId())));

        if (dto.getImageUrl() != null) {
            String fileName = Paths.get(URI.create(dto.getImageUrl())).getFileName().toString();
            figure.setImageUrl(fileName);
        }
        return figure;
    }

    public FigureDTO toDTO(Figure figure) {
        FigureDTO dto = new FigureDTO();
        dto.setId(figure.getId());
        dto.setName(figure.getName());
        dto.setBrandId(figure.getBrand().getId());
        dto.setBrandName(figure.getBrand().getName()); //Convierte el id al nombre

        if (figure.getImageUrl() != null) {
            dto.setImageUrl(Constantes.IMAGES_URL + figure.getImageUrl());
        }

        dto.setInStock(figure.getInStock());
        dto.setPrice(figure.getPrice());
        return dto;
    }
}

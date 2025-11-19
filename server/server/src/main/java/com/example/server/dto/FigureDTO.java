package com.example.server.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class FigureDTO {

    private Long id;

    @NotBlank(message = "El nombre de la figura es obligatorio")
    private String name;

    @NotNull(message = "La marca es obligatoria")
    private Long brandId;

    private String imageUrl;

    private String collection;

    private BigDecimal price; 

    private Boolean inStock;

    private String brandName;

    private String anime;

    private String description;

    private LocalDate year;

    private String material;

    private LocalDateTime lastUpdate;
}

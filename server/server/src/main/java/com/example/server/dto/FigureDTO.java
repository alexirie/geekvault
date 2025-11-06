package com.example.server.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FigureDTO {

    private Long id;

    @NotBlank(message = "El nombre de la figura es obligatorio")
    private String name;

    @NotNull(message = "La marca es obligatoria")
    private Long brandId;

    private String imageUrl;

    private BigDecimal price; 

    private Boolean inStock;

    private String brandName;
}

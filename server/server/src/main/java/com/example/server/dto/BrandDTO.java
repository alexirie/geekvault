package com.example.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BrandDTO {

    private Long id;

    @NotBlank(message = "El nombre de la marca es obligatorio")
    private String name;
}

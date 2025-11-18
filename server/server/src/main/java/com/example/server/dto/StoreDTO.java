package com.example.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StoreDTO {

    private Long id;

    @NotBlank(message = "El nombre de la tienda es obligatorio")
    private String name;

    private String region;
}

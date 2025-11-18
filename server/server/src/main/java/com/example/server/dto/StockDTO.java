package com.example.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class StockDTO {

    private Long id;

    @NotNull(message = "Figure ID es obligatorio")
    private Long figureId;

    @NotNull(message = "Store ID es obligatorio")
    private Long storeId;

    @NotNull(message = "Precio obligatorio")
    private BigDecimal price;

    @NotNull(message = "Disponibilidad obligatoria")
    private Boolean available;

    private String productUrl;

    private LocalDateTime lastChecked;

    private String figureName;

    private String storeName;
}

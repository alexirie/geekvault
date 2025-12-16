package com.example.server.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCollectionDTO {
    private Long figureId;
    private String name;
    private String brandName; 
    private String imageUrl;
    private String collection;
    private String anime;
    private BigDecimal price;
    private Boolean inStock;
    private LocalDate year;
    private String material;
    private String description;
}

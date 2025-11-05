package com.example.server.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Figure figure;

    @ManyToOne
    private Store store;

    private BigDecimal price;

    private Boolean available;

     private String productUrl;

    private LocalDateTime lastChecked;
}

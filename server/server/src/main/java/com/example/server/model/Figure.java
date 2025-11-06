package com.example.server.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Figure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    private Brand brand;

    @Column(name = "image_url", length=500)
    private String imageUrl;

    private String collection;

    private BigDecimal price;

    private Boolean inStock;

    private LocalDateTime lastUpdate;
}

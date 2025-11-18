package com.example.server.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    private String collection;

    private String anime;

    private BigDecimal price;

    @Column(name = "in_stock")
    private Boolean inStock;

    private LocalDate year;

    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "figure", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stock> stockList = new ArrayList<>();

    @Column(name = "last_update")
    private LocalDateTime lastUpdate;

    @PrePersist
    protected void onCreate() {
        this.lastUpdate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.lastUpdate = LocalDateTime.now();
    }
}

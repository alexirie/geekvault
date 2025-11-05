package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {}

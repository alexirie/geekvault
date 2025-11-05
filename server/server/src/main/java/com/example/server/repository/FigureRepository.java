package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Figure;

public interface FigureRepository extends JpaRepository<Figure, Long> {}

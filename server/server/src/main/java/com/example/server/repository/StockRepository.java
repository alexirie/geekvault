package com.example.server.repository;

import com.example.server.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {

    List<Stock> findByFigureId(Long figureId);

    List<Stock> findByStoreId(Long storeId);

}



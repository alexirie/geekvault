package com.example.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {}


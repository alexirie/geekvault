package com.example.server.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.example.server.model.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);
  void deleteByUser(User user);
}
package com.example.server.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import com.example.server.model.User;

/**
 * Repositorio JPA para manejar los Refresh Tokens en la base de datos.
 *
 * Propósito:
 * - Permite buscar, guardar y eliminar refresh tokens asociados a un usuario.
 * - Facilita la gestión de la expiración y revocación de tokens.
 *
 * Métodos importantes:
 * - findByToken(String token):
 *     Busca un RefreshToken por su string único. 
 *     Devuelve Optional<RefreshToken>, útil para validar si un token existe y no ha expirado.
 *
 * - deleteByUser(User user):
 *     Borra todos los refresh tokens asociados a un usuario específico.
 *     Se marca con @Transactional y @Modifying porque es una operación de modificación directa en la DB.
 *
 * Quién lo usa:
 * - Servicios de autenticación (AuthService o AuthController indirectamente) para:
 *   - Validar si un refresh token es válido.
 *   - Revocar tokens al hacer logout o cuando expiran.
 */

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);

  @Transactional
  @Modifying
  void deleteByUser(User user);
}
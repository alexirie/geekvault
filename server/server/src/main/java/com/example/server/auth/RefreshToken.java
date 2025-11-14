package com.example.server.auth;

import jakarta.persistence.*;
import java.time.Instant;

import com.example.server.model.User;

import lombok.*;

/**
 * Entidad JPA que representa un refresh token en la base de datos.
 *
 * Propósito:
 * - Guardar tokens de refresco asociados a un usuario para poder generar
 *   nuevos access tokens sin necesidad de que el usuario haga login de nuevo.
 *
 * Campos:
 * - id: identificador único del token (autogenerado).
 * - token: el string del refresh token (único en la tabla).
 * - user: el usuario al que pertenece el refresh token (relación ManyToOne con User).
 * - expiryDate: fecha y hora de expiración del token.
 *
 * Quién la usa:
 * - RefreshTokenRepository: para guardar, buscar y eliminar refresh tokens.
 * - AuthController (indirectamente) a través de servicios que generan y validan refresh tokens.
 *
 * Notas:
 * - Se utiliza FetchType.LAZY para que la información del usuario
 *   solo se cargue cuando sea necesario.
 * - La tabla en la DB se llama "refresh_tokens".
*/

@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String token;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(nullable = false)
  private Instant expiryDate;

}

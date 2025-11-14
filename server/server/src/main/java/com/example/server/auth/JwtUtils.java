package com.example.server.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Clase utilitaria para generar y validar JWTs (JSON Web Tokens).
 * 
 * Funciona como un helper que encapsula toda la lógica de creación y verificación
 * de tokens JWT para la autenticación de usuarios.
 *
 * Quién la llama:
 * - AuthTokenFilter: valida el token que llega en cada request y carga al usuario en SecurityContext.
 * - AuthController (o cualquier servicio de autenticación): genera un token al hacer login.
*/

@Component
public class JwtUtils {

  private final Key key;
  private final long jwtExpirationMs;

  public JwtUtils(@Value("${app.jwt.secret}") String secret,
                  @Value("${app.jwt.expiration-ms}") long jwtExpirationMs) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes());
    this.jwtExpirationMs = jwtExpirationMs;
  }

  public String generateJwtToken(String username) {
    return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
        .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }
}
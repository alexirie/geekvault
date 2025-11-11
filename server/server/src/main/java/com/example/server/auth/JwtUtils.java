package com.example.server.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

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
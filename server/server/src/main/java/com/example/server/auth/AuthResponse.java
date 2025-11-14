package com.example.server.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * AuthResponse es un DTO que se utiliza para 
 * enviar los tokens de autenticación al frontend después de que un 
 * usuario se loguea correctamente.
 *
 * Contiene:
 * - accessToken: Token JWT que se utiliza para autenticar al usuario 
 *   en las siguientes peticiones al backend.
 * - refreshToken: Token utilizado para renovar el accessToken cuando 
 *   este expire, evitando que el usuario tenga que loguearse de nuevo.
 *
 * Esta clase normalmente la devuelve el AuthController en la respuesta 
 * de login o refresh de token.
 */

@Data
@AllArgsConstructor
public class AuthResponse {
    /**
     * Token JWT para autenticar las peticiones del usuario.
    */
    private String accessToken;

    /**
     * Token que permite renovar el accessToken sin reautenticar.
    */
    private String refreshToken;
}

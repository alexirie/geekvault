package com.example.server.auth;

import lombok.Data;

/**
 * DTO (Data Transfer Object) que representa los datos enviados
 * por el cliente para solicitar un nuevo token de acceso usando
 * un refresh token.
 *
 * Campos:
 * - refreshToken: el token de refresco previamente emitido al usuario
 *
 * Quién la llama:
 * - AuthController#refreshToken(RefreshRequest): recibe este objeto
 *   desde el cuerpo de la petición POST /auth/refresh.
 *
 * Nota:
 * Esta clase no contiene lógica de negocio; solo encapsula el token
 * que se envía para obtener un nuevo JWT válido.
 */

@Data
public class RefreshRequest {
    private String refreshToken;
}

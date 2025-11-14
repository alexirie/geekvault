package com.example.server.auth;

import lombok.Data;

/**
 * DTO (Data Transfer Object) que representa los datos enviados
 * por el cliente al intentar iniciar sesión.
 *
 * Contiene únicamente los campos necesarios para autenticar al usuario:
 * - email: correo electrónico del usuario
 * - password: contraseña del usuario
 *
 * Quién la llama:
 * - AuthController#authenticateUser(LoginRequest): recibe este objeto desde
 *   el cuerpo de la petición POST /auth/login.
 *
 * Nota:
 * Esta clase no contiene lógica de negocio; solo encapsula los datos de la request.
*/

@Data
public class LoginRequest {
    private String email;
    private String password;
}

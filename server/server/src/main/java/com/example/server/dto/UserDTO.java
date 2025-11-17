package com.example.server.dto;

import lombok.Data;

import java.time.Instant;

import jakarta.validation.constraints.*;

import java.util.Set;

@Data
public class UserDTO {

    private Long id; // útil para updates y responses

    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6, max = 50)
    private String password;

    private boolean enabled = true;

    private int failedLoginAttempts = 0;

    private Instant lockUntil;

    private Set<String> roles;

}

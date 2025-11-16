package com.example.server.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class UserDTO {

    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6, max = 50)
    private String password;


}

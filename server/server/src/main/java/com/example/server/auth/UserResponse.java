package com.example.server.auth;

import lombok.Data;
import com.example.server.model.User;
import com.example.server.model.UserRole;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;

    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.roles = user.getRoles() // Set<UserRole>
                .stream()
                .map(UserRole::getRole) // convertimos a String
                .collect(Collectors.toSet());
        this.username = user.getUsername();
    }

    // Nuevo constructor que recibe los campos directamente
    public UserResponse(Long id, String username, String email, Set<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}

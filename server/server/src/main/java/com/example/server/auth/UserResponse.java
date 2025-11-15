package com.example.server.auth;

import lombok.Data;
import com.example.server.model.User;
import java.util.Set;


@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private Set<String> roles;

    public UserResponse(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.roles = user.getRoles();
        this.username = user.getUsername();
    }
}


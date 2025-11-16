package com.example.server.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Set;
import lombok.*;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(exclude = "roles") // exclude para evitar bucle
@ToString(exclude = "roles")
public class User {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserRole> roles;

    private boolean enabled = true;
    private int failedLoginAttempts = 0;

    /** Fecha hasta la cual el usuario esta bloqueado */
    private Instant lockUntil;
}

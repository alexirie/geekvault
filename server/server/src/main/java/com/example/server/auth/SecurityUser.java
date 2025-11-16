package com.example.server.auth;

import com.example.server.model.User;
import com.example.server.model.UserRole;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import lombok.RequiredArgsConstructor;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * SecurityUser es un adaptador que convierte la entidad User de la aplicación
 * a un UserDetails de Spring Security.
 * 
 * Propósito:
 * - Spring Security trabaja con UserDetails para realizar autenticación y autorización.
 * - Esta clase mapea los datos del usuario (email, contraseña, roles, estado) al formato que espera Spring Security.
 *
 * Quién la llama:
 * - CustomUserDetailsService.loadUserByUsername() devuelve un SecurityUser cuando se autentica un usuario.
 * - Spring Security utiliza esta clase internamente para verificar credenciales y permisos.
*/

@RequiredArgsConstructor
public class SecurityUser implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream()
                .map(UserRole::getRole)   
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail(); 
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        if (user.getLockUntil() == null) return true;
        return user.getLockUntil().isBefore(java.time.Instant.now());
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}

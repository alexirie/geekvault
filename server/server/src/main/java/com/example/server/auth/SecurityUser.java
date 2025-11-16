package com.example.server.auth;

import com.example.server.model.User;
import com.example.server.model.UserRole;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import lombok.RequiredArgsConstructor;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.List;

/**
 * SecurityUser es un adaptador que convierte la entidad User de la aplicación
 * a un UserDetails de Spring Security.
 * 
 * Propósito:
 * - Spring Security trabaja con UserDetails para realizar autenticación y
 * autorización.
 * - Esta clase mapea los datos del usuario (email, contraseña, roles, estado)
 * al formato que espera Spring Security.
 *
 * Quién la llama:
 * - CustomUserDetailsService.loadUserByUsername() devuelve un SecurityUser
 * cuando se autentica un usuario.
 * - Spring Security utiliza esta clase internamente para verificar credenciales
 * y permisos.
 */

@RequiredArgsConstructor
public class SecurityUser implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println("SecurityUser: generando authorities para user = " + user.getEmail());

        if (user.getRoles() == null) {
            System.out.println("SecurityUser: roles es null");
            return List.of(); // colección vacía segura
        }

        user.getRoles().forEach(r -> System.out.println("SecurityUser: role = " + r.getRole()));

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(UserRole::getRole)
                .peek(r -> System.out.println("SecurityUser: role string = " + r))
                .filter(r -> r != null && !r.isBlank())
                .map(SimpleGrantedAuthority::new)
                .peek(a -> System.out.println("SecurityUser: authority creada = " + a))
                .collect(Collectors.toList());

        System.out.println("SecurityUser: authorities finales = " + authorities);

        return authorities;
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
        if (user.getLockUntil() == null)
            return true;
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

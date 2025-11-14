package com.example.server.auth;

import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

/**
 * Servicio encargado de cargar los detalles de un usuario a partir de su email.
 * 
 * Este servicio implementa UserDetailsService, que es la interfaz que Spring Security
 * usa para obtener la información de autenticación de un usuario.
 *
 * Quién lo llama:
 * - Spring Security automáticamente llama a este servicio cuando se necesita autenticar
 *   a un usuario, por ejemplo dentro de AuthTokenFilter o DaoAuthenticationProvider.
 * - En la práctica, cuando alguien hace login con email y password, Spring Security
 *   llama a loadUserByUsername(email) para validar credenciales.
 */

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Carga un usuario a partir de su email.
     *
     * @param email Email del usuario que intenta autenticarse.
     * @return UserDetails Objeto con información de seguridad del usuario.
     * @throws UsernameNotFoundException si no existe un usuario con ese email.
    */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return new SecurityUser(user);
    }
}

package com.example.server.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

/**
 * Configuración de seguridad de Spring Security para la aplicación.
 * 
 * Propósito:
 * - Configura la autenticación y autorización de endpoints.
 * - Añade filtros para validar JWT en cada petición.
 * - Define CORS para permitir llamadas desde el frontend.
 * - Configura el PasswordEncoder para encriptar contraseñas.
 *
 * Componentes importantes:
 * - authTokenFilter(): filtro que intercepta todas las solicitudes y valida el JWT.
 * - filterChain(HttpSecurity): define qué endpoints son públicos y cuáles requieren autenticación.
 * - authenticationManager(): expone el AuthenticationManager de Spring para autenticación manual.
 * - passwordEncoder(): define cómo se encriptan y verifican las contraseñas (BCrypt).
 * - corsConfigurationSource(): configura los orígenes permitidos y cabeceras CORS.
 *
 * Uso:
 * - Spring Security llama automáticamente a filterChain para cada petición.
 * - AuthTokenFilter se ejecuta antes de UsernamePasswordAuthenticationFilter.
 * - Los controladores pueden asumir que el usuario está autenticado si llega a ellos.
 */


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public AuthTokenFilter authTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService);
    }

    /**
     * Configuración principal de la seguridad HTTP.
     * Define endpoints públicos, autenticados, CORS y añade filtros.
    */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(c -> c.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/logo.jpg",
                                "/static/**",
                                "/favicon.ico",
                                "/manifest.json",
                                "/uploads/**",
                                "/api/**",
                                "/figures/**",
                                "/auth/**")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
            "http://localhost:3000",                 // para desarrollo local
            "https://freak-project-production.up.railway.app" // para producción
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

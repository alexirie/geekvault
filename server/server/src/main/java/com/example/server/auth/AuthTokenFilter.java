package com.example.server.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.example.server.model.User;
import com.example.server.repository.UserRepository;

import java.io.IOException;

/**
 * AuthTokenFilter es un filtro que se ejecuta una vez por petición HTTP
 * (hereda de OncePerRequestFilter). Su función principal es:
 * 
 * 1. Interceptar todas las peticiones al backend.
 * 2. Permitir que las rutas de autenticación (/auth/login, /auth/register)
 * pasen sin JWT.
 * 3. Validar el JWT enviado en la cabecera Authorization ("Bearer <token>")
 * para
 * las demás rutas protegidas.
 * 4. Si el JWT es válido, carga los detalles del usuario y los coloca
 * en el contexto de seguridad (SecurityContext) de Spring Security,
 * para que los controladores puedan acceder a la identidad del usuario.
 *
 * Este filtro se registra normalmente en la configuración de Spring Security
 * para que se ejecute antes de llegar a los controladores.
 */

public class AuthTokenFilter extends OncePerRequestFilter {

  private final JwtUtils jwtUtils;
  private final CustomUserDetailsService userDetailsService;
  private final UserRepository userRepository;

  public AuthTokenFilter(JwtUtils jwtUtils, CustomUserDetailsService uds, UserRepository userRepository) {
    this.jwtUtils = jwtUtils;
    this.userDetailsService = uds;
    this.userRepository = userRepository;
  }

  /**
   * Método principal del filtro.
   *
   * @param request     La petición HTTP entrante.
   * @param response    La respuesta HTTP.
   * @param filterChain Cadena de filtros restante.
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String path = request.getServletPath();
    System.out.println("AuthTokenFilter: path = " + path);

    // Permitir login y register sin JWT
    if (path.startsWith("/auth/")) {
      filterChain.doFilter(request, response);
      return;
    }

    // Procesar JWT
    String jwt = parseJwt(request);
    System.out.println("AuthTokenFilter: JWT obtenido = " + jwt);

    if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
      String username = jwtUtils.getUserNameFromJwtToken(jwt);
      System.out.println("AuthTokenFilter: username del JWT = " + username);

      // Cargar User completo (tu entidad) en lugar de solo UserDetails
      try {
            User currentUser = userRepository.findByEmail(username)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            System.out.println("AuthTokenFilter: currentUser encontrado = " + currentUser);

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            System.out.println("AuthTokenFilter: authorities = " + userDetails.getAuthorities());

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    currentUser,
                    null,
                    userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception e) {
            System.out.println("AuthTokenFilter: ERROR autenticando usuario");
            e.printStackTrace();
        }
    }else {
        System.out.println("AuthTokenFilter: JWT inválido o no presente");
    }

    filterChain.doFilter(request, response); // ÚNICA llamada
  }

  /**
   * Extrae el JWT del header "Authorization" de la petición.
   *
   * @param request La petición HTTP.
   * @return El token JWT si existe, o null si no está presente.
   */
  private String parseJwt(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");
    if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
      return headerAuth.substring(7);
    }
    return null;
  }
}
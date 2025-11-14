package com.example.server.auth;

import com.example.server.dto.UserDTO;
import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Set;


import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;

    // -----------------------------
    // ✅ LOGIN
    // -----------------------------
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("No existe el usuario"));

        String accessToken = jwtUtils.generateJwtToken(user.getEmail());

        RefreshToken refresh = createRefreshToken(user);

        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refresh.getToken()));
    }

    private RefreshToken createRefreshToken(User user) {
        refreshTokenRepository.deleteByUser(user);

        RefreshToken token = new RefreshToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiryDate(Instant.now().plusSeconds(60L * 60 * 24 * 30)); // 30 días

        return refreshTokenRepository.save(token);
    }

    // -----------------------------
    // ✅ REFRESH ACCESS TOKEN
    // -----------------------------
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshRequest req) {

        Optional<RefreshToken> tokenOpt = refreshTokenRepository.findByToken(req.getRefreshToken());

        if (tokenOpt.isEmpty() || tokenOpt.get().getExpiryDate().isBefore(Instant.now())) {
            return ResponseEntity.badRequest().body("Refresh token inválido o expirado");
        }

        User user = tokenOpt.get().getUser();

        String newAccessToken = jwtUtils.generateJwtToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(newAccessToken, req.getRefreshToken()));
    }

    // -----------------------------
    // ✅ LOGOUT
    // -----------------------------
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody RefreshRequest req) {

        refreshTokenRepository.findByToken(req.getRefreshToken())
                .ifPresent(refreshTokenRepository::delete);

        return ResponseEntity.ok("Logout correcto");
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO request) {

        // ✅ Validaciones básicas
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("El email ya está registrado");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("El username ya está en uso");
        }

        // ✅ Crear usuario
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());

        // Hashear la contraseña
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Roles por defecto
        user.setRoles(Set.of("ROLE_USER"));

        user.setEnabled(true);
        user.setFailedLoginAttempts(0);

        userRepository.save(user);

        return ResponseEntity.ok("Usuario registrado correctamente");
    }
}

package com.example.server.auth;

import com.example.server.model.User;
import com.example.server.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    // -----------------------------
    // ✅ LOGIN
    // -----------------------------
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("No existe el usuario"));

        String accessToken = jwtUtils.generateJwtToken(user.getEmail());

        RefreshToken refresh = createRefreshToken(user);

        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refresh.getToken()
        ));
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
}

package com.example.server.controller;

import com.example.server.dto.UserFavoriteDTO;
import com.example.server.model.Figure;
import com.example.server.model.User;
import com.example.server.service.FigureService;
import com.example.server.service.UserFavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/user/favorites")
@RequiredArgsConstructor
public class UserFavoriteController {

    private final UserFavoriteService userFavoriteService;
    private final FigureService figureService; // para buscar figuras por id

    // GET -> obtener favoritos
    @GetMapping
    public List<UserFavoriteDTO> getFavorites(@AuthenticationPrincipal User currentUser) {
        return userFavoriteService.getFavoritesByUser(currentUser);
    }

    // POST -> añadir favorito
    @PostMapping
    public Map<String, Object> addFavorite(
            @AuthenticationPrincipal User currentUser,
            @RequestBody Map<String, Long> body) {

        System.out.println("=== ADD FAVORITE ===");
        System.out.println("Usuario actual: " + currentUser);
        System.out.println("Body recibido: " + body);

        if (currentUser == null) {
            System.out.println("ERROR: Usuario no autenticado");
            throw new RuntimeException("Usuario no autenticado");
        }
        Long figureId = body.get("figureId");
        Figure figure = figureService.findById(figureId)
                .orElseThrow(() -> new RuntimeException("Figura no encontrada"));
        userFavoriteService.addFavorite(currentUser, figure);
        System.out.println("Favorito añadido correctamente!");
        return Map.of("status", "ok");
    }

    // DELETE -> eliminar favorito
    @DeleteMapping("/{figureId}")
    public void removeFavorite(@AuthenticationPrincipal User currentUser, @PathVariable Long figureId) {
        Figure figure = figureService.findById(figureId)
                .orElseThrow(() -> new RuntimeException("Figura no encontrada"));
        userFavoriteService.removeFavorite(currentUser, figure);
    }

    // POST -> toggle favorito
    @PostMapping("/{figureId}/toggle")
    public boolean toggleFavorite(@AuthenticationPrincipal User currentUser, @PathVariable Long figureId) {
        Figure figure = figureService.findById(figureId)
                .orElseThrow(() -> new RuntimeException("Figura no encontrada"));
        return userFavoriteService.toggleFavorite(currentUser, figure);
    }
}

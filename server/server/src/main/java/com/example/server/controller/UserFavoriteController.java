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

@RestController
@RequestMapping("/user/favorites")
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
    @PostMapping("/{figureId}")
    public void addFavorite(@AuthenticationPrincipal User currentUser, @PathVariable Long figureId) {
        Figure figure = figureService.findById(figureId)
                .orElseThrow(() -> new RuntimeException("Figura no encontrada"));
        userFavoriteService.addFavorite(currentUser, figure);
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

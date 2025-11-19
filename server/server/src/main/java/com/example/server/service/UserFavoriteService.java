package com.example.server.service;

import com.example.server.dto.UserFavoriteDTO;
import com.example.server.model.UserFavorite;
import com.example.server.model.Figure;
import com.example.server.model.User;
import com.example.server.repository.UserFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserFavoriteService {

    private final UserFavoriteRepository repository;

    public List<UserFavoriteDTO> getFavoritesByUser(User user) {
        return repository.findByUser(user).stream()
                .map(fav -> new UserFavoriteDTO(
                        fav.getFigure().getId(),
                        fav.getFigure().getName(),
                        fav.getFigure().getBrand() != null ? fav.getFigure().getBrand().getName() : null,
                        fav.getFigure().getImageUrl(),
                        fav.getFigure().getCollection(),
                        fav.getFigure().getAnime(),
                        fav.getFigure().getPrice(),
                        fav.getFigure().getInStock(),
                        fav.getFigure().getYear(),
                        fav.getFigure().getMaterial(),
                        fav.getFigure().getDescription()
                ))
                .collect(Collectors.toList());
    }

    // Crear favorito
    @Transactional
    public void addFavorite(User user, Figure figure) {
        if (repository.findByUserAndFigure(user, figure).isEmpty()) {
            UserFavorite fav = new UserFavorite();
            fav.setUser(user);
            fav.setFigure(figure);
            repository.save(fav);
        }
    }

    // Eliminar favorito
    @Transactional
    public void removeFavorite(User user, Figure figure) {
        repository.findByUserAndFigure(user, figure)
                .ifPresent(repository::delete);
    }

    // Alternar favorito (opcional)
    @Transactional
    public boolean toggleFavorite(User user, Figure figure) {
        var optionalFav = repository.findByUserAndFigure(user, figure);
        if (optionalFav.isPresent()) {
            repository.delete(optionalFav.get());
            return false; // ahora no es favorito
        } else {
            addFavorite(user, figure);
            return true; // ahora es favorito
        }
    }
}

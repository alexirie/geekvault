package com.example.server.service;

import com.example.server.dto.UserCollectionDTO;
import com.example.server.model.UserCollection;
import com.example.server.model.Figure;
import com.example.server.model.User;
import com.example.server.repository.UserCollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserCollectionService {

    private final UserCollectionRepository repository;

    public List<UserCollectionDTO> getCollectionByUser(User user) {
        return repository.findByUser(user).stream()
                .map(fav -> new UserCollectionDTO(
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

    // Crear coleccion
    @Transactional
    public void addCollection(User user, Figure figure) {
        if (repository.findByUserAndFigure(user, figure).isEmpty()) {
            UserCollection fav = new UserCollection();
            fav.setUser(user);
            fav.setFigure(figure);
            repository.save(fav);
        }
    }

    // Eliminar coleccion
    @Transactional
    public void removeCollection(User user, Figure figure) {
        repository.findByUserAndFigure(user, figure)
                .ifPresent(repository::delete);
    }

    // Alternar coleccion (opcional)
    @Transactional
    public boolean toggleCollection(User user, Figure figure) {
        var optionalFav = repository.findByUserAndFigure(user, figure);
        if (optionalFav.isPresent()) {
            repository.delete(optionalFav.get());
            return false; // ahora no es coleccion
        } else {
            addCollection(user, figure);
            return true; // ahora es collecion
        }
    }
}

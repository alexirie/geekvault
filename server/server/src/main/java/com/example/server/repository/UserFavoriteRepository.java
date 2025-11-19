package com.example.server.repository;

import com.example.server.model.UserFavorite;
import com.example.server.model.Figure;
import com.example.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {
    List<UserFavorite> findByUser(User user);
    Optional<UserFavorite> findByUserAndFigure(User user, Figure figure);

    void deleteByUserAndFigure(User user, Figure figure);
}

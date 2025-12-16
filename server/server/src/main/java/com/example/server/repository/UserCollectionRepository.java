package com.example.server.repository;

import com.example.server.model.UserCollection;
import com.example.server.model.Figure;
import com.example.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {
    List<UserCollection> findByUser(User user);
    Optional<UserCollection> findByUserAndFigure(User user, Figure figure);

    void deleteByUserAndFigure(User user, Figure figure);
}

package com.example.server.service;

import com.example.server.model.User;
import com.example.server.model.UserRole;
import com.example.server.dto.UserDTO;
import com.example.server.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.Collections;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id)
                .map(this::toDTO);
    }

    public UserDTO create(UserDTO dto) {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Username ya existe");
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email ya existe");
        }
        User user = fromDTO(dto);
        return toDTO(userRepository.save(user));
    }

    public UserDTO update(Long id, UserDTO dto) {
        User updated = userRepository.findById(id)
                .map(user -> {
                    user.setUsername(dto.getUsername());
                    user.setEmail(dto.getEmail());
                    user.setPassword(dto.getPassword());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        return toDTO(updated);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    // --- Conversión entre User y UserDTO ---
    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPassword(""); // Nunca devolvemos la password real
        dto.setUrlImagen(user.getUrlImagen());
        // Roles
        if (user.getRoles() != null) {
            Set<String> roleNames = user.getRoles().stream()
                    .map(UserRole::getRole) // directamente el String
                    .collect(Collectors.toSet());
            dto.setRoles(roleNames);
        } else {
            dto.setRoles(Collections.emptySet());
        }

        return dto;
    }

    public User fromDTO(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setUrlImagen(dto.getUrlImagen());
        // Cifrar la contraseña antes de guardar
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        if (dto.getRoles() != null) {
            Set<UserRole> roles = dto.getRoles().stream()
                    .map(roleName -> new UserRole(null, roleName, user))
                    .collect(Collectors.toSet());
            user.setRoles(roles);
        }

        user.setEnabled(true);
        user.setFailedLoginAttempts(0);
        user.setLockUntil(null);

        return user;
    }
}

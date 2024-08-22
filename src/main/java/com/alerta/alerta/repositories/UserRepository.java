package com.alerta.alerta.repositories;

import com.alerta.alerta.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserModel, UUID> {
    Optional<UserModel> findByEmail(String email);

    Optional<UserModel> findById(UUID id);

}

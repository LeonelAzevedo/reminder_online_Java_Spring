package com.alerta.alerta.services;

import com.alerta.alerta.dto.ResponseDTO;
import com.alerta.alerta.dto.ResponseLoginDTO;
import com.alerta.alerta.dto.UserDto;
import com.alerta.alerta.exceptions.ResourceNotFoundException;
import com.alerta.alerta.models.UserModel;
import com.alerta.alerta.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class UserService {


    @Autowired
    private final UserRepository userRepository;


    @Transactional
    public UserModel saveUser(ResponseDTO userDto) {
        UserModel userModel = new UserModel();
        userModel.setName(userDto.name());

        return userRepository.save(userModel);
    }


    public Optional<UserModel> getUser(String emailUser) {
        return userRepository.findByEmail(emailUser);
    }

    @Transactional
    public ResponseEntity<ResponseLoginDTO> updateUser(UserDto userDto) {
        UserModel user = userRepository.findByEmail(userDto.email())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        user.setName(userDto.username());
        this.userRepository.save(user);

        ResponseLoginDTO response = new ResponseLoginDTO(user.getName(), user.getEmail(), null);
        return ResponseEntity.ok(response);

    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

}

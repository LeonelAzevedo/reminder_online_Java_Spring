package com.alerta.alerta.controllers;

import com.alerta.alerta.dto.ResponseDTO;
import com.alerta.alerta.dto.ResponseLoginDTO;
import com.alerta.alerta.dto.UserDto;
import com.alerta.alerta.exceptions.ResourceNotFoundException;
import com.alerta.alerta.models.UserModel;
import com.alerta.alerta.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/profile")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserModel> saveUser(@RequestBody @Valid ResponseDTO userDto) {
        UserModel savedUser = userService.saveUser(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário deletado com sucesso");
    }

    @PutMapping
    public ResponseEntity<ResponseLoginDTO> updateUser(@RequestBody @Valid UserDto userDto) {
        ResponseEntity<ResponseLoginDTO> updatedUserResponse = userService.updateUser(userDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUserResponse.getBody());
    }


    @GetMapping("/{email}")
    public ResponseEntity<UserModel> getUser(@PathVariable String email) {
        UserModel user = userService.getUser(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}

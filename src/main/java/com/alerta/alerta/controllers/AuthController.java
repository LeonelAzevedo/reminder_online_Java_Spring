package com.alerta.alerta.controllers;

import com.alerta.alerta.dto.LoginRequestDTO;
import com.alerta.alerta.dto.RegisterRequestDTO;
import com.alerta.alerta.dto.ResponseDTO;
import com.alerta.alerta.dto.ResponseLoginDTO;
import com.alerta.alerta.exceptions.UserNotFoundException;
import com.alerta.alerta.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ResponseLoginDTO> login(@RequestBody LoginRequestDTO body) {
        try {
            ResponseEntity<ResponseLoginDTO> response = authService.authenticate(body.email(), body.password());
            return ResponseEntity.ok(response.getBody());
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body(new ResponseLoginDTO(e.getMessage(), null, null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseLoginDTO> register(@RequestBody RegisterRequestDTO body) {
        try {
            ResponseLoginDTO response = authService.register(body.email(), body.password(), body.name());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseLoginDTO(e.getMessage(), null, null));
        }
    }
}

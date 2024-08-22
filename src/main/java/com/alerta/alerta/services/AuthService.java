package com.alerta.alerta.services;

import com.alerta.alerta.dto.ResponseDTO;
import com.alerta.alerta.dto.ResponseLoginDTO;
import com.alerta.alerta.exceptions.InvalidCredentialsException;
import com.alerta.alerta.exceptions.UserNotFoundException;
import com.alerta.alerta.models.UserModel;
import com.alerta.alerta.repositories.UserRepository;
import com.alerta.alerta.infra.security.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public  ResponseEntity<ResponseLoginDTO> authenticate(String email, String password) {
        UserModel user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            String token = tokenService.generateToken(user);
            ResponseLoginDTO response = new ResponseLoginDTO(user.getName(), user.getEmail(), token);
            return ResponseEntity.ok(response);
        }

        throw new InvalidCredentialsException("Credenciais inválidas");
    }

    public ResponseLoginDTO register(String email, String password, String name) {
        if (repository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Usuário não existe");
        }

        UserModel newUser = new UserModel();
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);
        newUser.setName(name);
        repository.save(newUser);

        String token = tokenService.generateToken(newUser);
        return new ResponseLoginDTO(newUser.getName(), newUser.getEmail(), null);
    }
}

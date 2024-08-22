package com.alerta.alerta.dto;


import java.time.LocalDateTime;
import java.util.UUID;


public record AlertDto(String title,
                       String description,
                       LocalDateTime dateTime,
                       String email,
                       UUID idAlert) {
}

package com.alerta.alerta.controllers;

import com.alerta.alerta.dto.AlertDto;
import com.alerta.alerta.dto.ResponseDTO;
import com.alerta.alerta.models.AlertModel;
import com.alerta.alerta.services.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alerts")
@RequiredArgsConstructor
public class AlertController {

    @Autowired
    private final AlertService alertService;

    @PostMapping("/create-reminder")
    public ResponseEntity<ResponseDTO> saveAlert(@RequestBody AlertDto alertDto) {
        AlertModel savedAlert = alertService.saveAlert(alertDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseDTO("Lembrete criado com sucesso", savedAlert));
    }

    @GetMapping("/reminder")
    public ResponseEntity<List<AlertModel>> getAllAlertsByEmail(@RequestParam("email") String emailUser) {
        List<AlertModel> alerts = alertService.getAllAlertsByUserEmail(emailUser);
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlertModel> getAlertById(@PathVariable UUID id) {
        AlertModel alert = alertService.getAlertById(id);
        return ResponseEntity.ok(alert);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO> updateAlert(@PathVariable UUID id, @RequestBody AlertDto alertDto) {
        AlertModel alert = alertService.updateAlert(id, alertDto);
        return ResponseEntity.ok(new ResponseDTO("Lembrete editado com sucesso", alert));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> deleteAlert(@PathVariable UUID id) {
        alertService.deleteAlert(id);
        return ResponseEntity.ok(new ResponseDTO("Lembrete deletado com sucesso", null));
    }
}

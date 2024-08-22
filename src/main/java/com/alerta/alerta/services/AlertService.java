package com.alerta.alerta.services;

import com.alerta.alerta.dto.AlertDto;
import com.alerta.alerta.models.AlertModel;
import com.alerta.alerta.repositories.AlertRepository;
import com.alerta.alerta.repositories.UserRepository;
import com.alerta.alerta.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;
    private final UserRepository userRepository;

    @Transactional
    public AlertModel saveAlert(AlertDto alertDto) {
        AlertModel alertModel = new AlertModel();
        alertModel.setTitle(alertDto.title());
        alertModel.setMessage(alertDto.description());
        alertModel.setReminderDateTime(alertDto.dateTime());

        userRepository.findByEmail(alertDto.email())
                .ifPresent(alertModel::setUser);

        return alertRepository.save(alertModel);
    }

    @Transactional
    public AlertModel updateAlert(UUID id, AlertDto alertDto) {
        AlertModel alertModel = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert não encontrado"));

        alertModel.setTitle(alertDto.title());
        alertModel.setMessage(alertDto.description());
        alertModel.setReminderDateTime(alertDto.dateTime());

        return alertRepository.save(alertModel);
    }

    @Transactional
    public void deleteAlert(UUID id) {
        if (!alertRepository.existsById(id)) {
            throw new ResourceNotFoundException("Alert não encontrado");
        }
        alertRepository.deleteById(id);
    }

    public List<AlertModel> getAllAlertsByUserEmail(String emailUser) {
        return alertRepository.findAlertsByUserEmail(emailUser);
    }

    public AlertModel getAlertById(UUID id) {
        return alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert não encontrado"));
    }

    public List<AlertModel> getAlertsByDate(String datetime) {
        return alertRepository.findAlertsList(datetime);
    }
}

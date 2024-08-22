package com.alerta.alerta.services;


import com.alerta.alerta.models.AlertModel;
import com.alerta.alerta.repositories.AlertRepository;
import com.alerta.alerta.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ScheduleService {

    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;

    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private UserRepository userRepository;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:00");

    @Scheduled(fixedDelay = 60000) //1min
    public void agendaAlerta() {

        LocalDateTime currentDateTime = LocalDateTime.now().withSecond(0).withNano(0);
        //String datateste = "2024-08-19T08:30:0";

        //List<AlertModel> listAlerts = this.alertRepository.findAlertsList(datateste);
        List<AlertModel> listAlerts = this.alertRepository.findAlertsList(currentDateTime.format(this.formatter));


        for (int i = 0; i < listAlerts.size(); i++) {

            String emailDestiny = userRepository.findById(listAlerts.get(i).getUser().getId()).get().getEmail();
            String nomeDestiny = userRepository.findById(listAlerts.get(i).getUser().getId()).get().getName();
            String title = listAlerts.get(i).getTitle();
            String message = listAlerts.get(i).getMessage();

            Map<String, Object> variables = new HashMap<>();
            variables.put("subject", title);
            variables.put("message", message);
            variables.put("name", nomeDestiny);


            String result = emailService.sendEmailAlert(emailDestiny, title, variables);
            System.out.println(result);
        }

    }


}

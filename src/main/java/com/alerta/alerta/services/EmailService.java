package com.alerta.alerta.services;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String remetente;

    public EmailService(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    public String sendEmailAlert(String destiny, String subject, Map<String, Object> variables) {
        try {
            Context context = new Context();
            context.setVariables(variables);

            String htmlMessage = templateEngine.process("email-template", context);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(remetente);
            mimeMessageHelper.setTo(destiny);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(htmlMessage, true);

            File logoFile = new File(getClass().getClassLoader().getResource("templates/LogoReminderOnline.png").getFile());
            if (logoFile.exists()) {
                mimeMessageHelper.addInline("logoReminderOnline", logoFile);
            } else {
                logger.warn("Logo não encontrada: {}", logoFile.getAbsolutePath());
            }

            javaMailSender.send(mimeMessage);
            return "E-mail enviado com sucesso";
        } catch (Exception e) {
            logger.error("Erro ao tentar enviar e-mail", e);
            return "Erro ao tentar enviar e-mail: " + e.getLocalizedMessage();
        }
    }
}

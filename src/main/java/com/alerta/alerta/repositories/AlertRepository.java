package com.alerta.alerta.repositories;

import com.alerta.alerta.models.AlertModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface AlertRepository extends JpaRepository<AlertModel, UUID> {

    AlertModel findAlertModelByUserId(UUID id);

    @Query(value = "SELECT * FROM tb_alert WHERE user_id = :id", nativeQuery = true)
    List<AlertModel> findAlertsByUserID(@Param("id") UUID id);

    @Query(value = "SELECT * FROM tb_alert WHERE user_id = (SELECT id FROM tb_user WHERE email = :email)", nativeQuery = true)
    List<AlertModel> findAlertsByUserEmail(@Param("email") String email);


    @Query(value = "SELECT id, message, reminder_datetime, title, user_id FROM tb_alert WHERE reminder_datetime = TO_TIMESTAMP(:datetime, 'YYYY-MM-DD\"T\"HH24:MI:SS')", nativeQuery = true)
    List<AlertModel> findAlertsList(@Param("datetime") String datetime);


}


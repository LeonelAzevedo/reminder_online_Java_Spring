package com.alerta.alerta.dto;

import com.alerta.alerta.models.AlertModel;

public record ResponseDTO (String name, AlertModel email) { }

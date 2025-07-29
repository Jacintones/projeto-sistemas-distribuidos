package com.restcon.api_cozinhas.controller.kitchen;


import jakarta.validation.constraints.NotBlank;

public record CreateKitchenDTO(
        @NotBlank(message = "O nome da Cozinha é obrigatório")
        String name,
        @NotBlank(message = "A descrição da Cozinha é obrigatória")
        String description
) {}

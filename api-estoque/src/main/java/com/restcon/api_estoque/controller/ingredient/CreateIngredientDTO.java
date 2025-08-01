package com.restcon.api_estoque.controller.ingredient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateIngredientDTO(
        @NotBlank(message = "O nome é obrigatório.")
        String name,
        @NotBlank(message = "A unidade é obrigatória.")
        String unit
) {}

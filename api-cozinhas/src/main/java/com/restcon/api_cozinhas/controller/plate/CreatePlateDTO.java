package com.restcon.api_cozinhas.controller.plate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.awt.geom.Arc2D;
import java.util.Map;

public record CreatePlateDTO(
        @NotBlank(message = "O nome é obrigatório") String name,
        @NotBlank(message = "A descrição do prato é obrigatória") String description,
        @NotBlank(message = "A receita é obrigatória") String recipe,
        @NotNull(message = "O preço é obrigatório") Integer kitchen_ID,
        @NotNull(message = "O preço é obrigatório") Integer price,
        @NotNull(message = "Inserir pelo menos um ingrediente") Map<Long, Double> ingredients
) {
}

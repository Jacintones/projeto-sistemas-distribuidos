package com.restcon.api_cozinhas.controller.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateOrderDTO(
        @NotNull(message = "O número da mesa é obrigatório") Integer table_number,
        @NotBlank(message = "O nome do garçon é obrigatório") String waiter,
        @NotNull(message = "Nenhum prato adicionado") long[] plates
) {}

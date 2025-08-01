package com.restcon.api_estoque.controller.stockSupplier;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateSupplierDTO(
        @NotBlank(message = "O nome do fornecedor é necessário.")
        String name,
        @NotBlank(message = "O email do fornecedor é necessário")
        String email,
        @NotBlank(message = "O endereço do fornecedor é necessário")
        String address,
        @NotNull(message = "O fornecedor deve ter pelo menos um ingrediente.")
        Long[] ingredientIDList
) {
}

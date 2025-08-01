package com.restcon.api_estoque.controller.stockChanges;

import com.restcon.api_estoque.entity.StockChanges.StockChangesTypes;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record CreateStockChangesDTO(
        @NotNull(message = "A unidade é obrigatória.")
        StockChangesTypes type,
        @NotNull(message = "Os ingredietnes são obrigatórios")
        Map<String, Float> ingredients,
        Integer cost,
        Long supplier_ID
) {
}

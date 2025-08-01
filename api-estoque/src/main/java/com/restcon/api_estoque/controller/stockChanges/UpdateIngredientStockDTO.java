package com.restcon.api_estoque.controller.stockChanges;

import com.restcon.api_estoque.entity.StockChanges.StockChangesTypes;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record UpdateIngredientStockDTO(
        @NotNull(message = "Tipe é obrigatório") StockChangesTypes type,
        @NotNull(message = "Lista de ingredientes é obrigatória") Map<String, Double> ingredientsList
) {}

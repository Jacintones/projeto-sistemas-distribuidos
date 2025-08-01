package com.restcon.api_estoque.controller.stockChanges;

import com.restcon.api_estoque.entity.StockChanges.StockChangesTypes;
import java.util.Map;

public record UpdateStockChangesDTO(Integer cost, StockChangesTypes type, Integer supplierID, Map<String, Float> ingredients) {
}

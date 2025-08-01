package com.restcon.api_cozinhas.controller.order;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class UpdateStockDTO {
    private String type;
    private Map<Long, Double> ingredientsList;

    public UpdateStockDTO(Map<Long, Double> ingredientsList) {
        this.ingredientsList = ingredientsList;
        this.type = "CONSUMO_PRATO";
    }

    public UpdateStockDTO() {

    }
}

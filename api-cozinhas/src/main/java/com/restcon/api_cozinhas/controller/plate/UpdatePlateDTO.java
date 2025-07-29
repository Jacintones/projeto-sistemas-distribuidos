package com.restcon.api_cozinhas.controller.plate;

import java.util.Map;

public record UpdatePlateDTO(String name, String description, String recipe, Integer kitchen_ID, Integer price, Map<Long, Double> ingredients) {
}

package com.restcon.api_estoque.service;

import com.restcon.api_estoque.controller.ingredient.CreateIngredientDTO;
import com.restcon.api_estoque.controller.ingredient.UpdateIngredientsDTO;
import com.restcon.api_estoque.entity.Ingredients;
import com.restcon.api_estoque.exceptions.IngredientNotFound;
import com.restcon.api_estoque.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public long createIngredient(CreateIngredientDTO createIngredientDTO) {

        var ingredient = new Ingredients(
            createIngredientDTO.name(),
            createIngredientDTO.unit()
        );

        var ingredientSaved = ingredientRepository.save(ingredient);

        return ingredientSaved.getIngredientsID();
    }

    public void updateIngredient(long id, UpdateIngredientsDTO updateIngredientsDTO) {
        var ingredient = this.getIngredientByID(id);

        if (updateIngredientsDTO.name() != null && !updateIngredientsDTO.name().isBlank()) {
            ingredient.setName(updateIngredientsDTO.name());
        }

        if (updateIngredientsDTO.unit() != null && !updateIngredientsDTO.unit().isBlank()) {
            ingredient.setUnit(updateIngredientsDTO.unit());
        }

        if (updateIngredientsDTO.quantity() != null && updateIngredientsDTO.quantity() > 0) {
            ingredient.setQuantity(updateIngredientsDTO.quantity());
        }

        ingredientRepository.save(ingredient);
    }

    public Ingredients getIngredientByID(long id) {
        var ingredient = ingredientRepository.findById(id);

        if (ingredient.isEmpty()) {
            throw new IngredientNotFound("Ingrediente não encontrado");
        }

        return ingredient.get();
    }

    public void deleteIngredient(long id) {
        var ingredient = getIngredientByID(id);

        ingredientRepository.deleteById(ingredient.getIngredientsID());
    }

    public List<Ingredients> getAllIngredients() {
        return ingredientRepository.findAll();
    }
}

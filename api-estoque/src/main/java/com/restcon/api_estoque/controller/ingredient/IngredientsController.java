package com.restcon.api_estoque.controller.ingredient;

import com.restcon.api_estoque.entity.Ingredients;
import com.restcon.api_estoque.service.IngredientService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/ingrediente")
public class IngredientsController {

    IngredientService ingredientService;

    public IngredientsController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping
    public ResponseEntity<Ingredients> createIngredient(@RequestBody @Valid CreateIngredientDTO createIngredientDTO) {
        var ingredient_id = ingredientService.createIngredient(createIngredientDTO);

        return ResponseEntity.created(URI.create("/ingrediente/id="+ingredient_id)).build();
    }

    @GetMapping
    public ResponseEntity<List<Ingredients>> getAllIngredients() {
        var ingredients = ingredientService.getAllIngredients();

        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/id={ingredientID}")
    public ResponseEntity<Ingredients> getIngredientByID(@PathVariable("ingredientID") long ingredientID) {
        var ingredient = ingredientService.getIngredientByID(ingredientID);

        return ResponseEntity.ok(ingredient);
    }

    @PutMapping("/id={ingredientID}")
    public ResponseEntity<Ingredients> updateIngredient(@PathVariable("ingredientID") long ingredientID,
                                                        @RequestBody @Valid UpdateIngredientsDTO updateIngredientsDTO) {
        ingredientService.updateIngredient(ingredientID, updateIngredientsDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id={ingredientID}")
    public ResponseEntity<Ingredients> deleteIngredient(@PathVariable("ingredientID") long ingredientID) {
        ingredientService.deleteIngredient(ingredientID);
        return ResponseEntity.noContent().build();
    }

}

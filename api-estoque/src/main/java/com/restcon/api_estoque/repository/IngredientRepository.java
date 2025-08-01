package com.restcon.api_estoque.repository;

import com.restcon.api_estoque.entity.Ingredients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredients, Long> {
}

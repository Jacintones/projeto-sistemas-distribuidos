package com.restcon.api_estoque.service;

import com.restcon.api_estoque.controller.stockSupplier.CreateSupplierDTO;
import com.restcon.api_estoque.controller.stockSupplier.UpdateSupplierDTO;
import com.restcon.api_estoque.entity.Ingredients;
import com.restcon.api_estoque.entity.StockSupplier;
import com.restcon.api_estoque.exceptions.IngredientNotFound;
import com.restcon.api_estoque.repository.StockSupplierRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockSupplierService {

    private final StockSupplierRepository stockSupplierRepository;
    private final IngredientService ingredientService;

    public StockSupplierService(StockSupplierRepository stockSupplierRepository, IngredientService ingredientService) {
        this.stockSupplierRepository = stockSupplierRepository;
        this.ingredientService = ingredientService;
    }

    public long createSupplier(CreateSupplierDTO createSupplierDTO) {
        List <Ingredients>  ingredientsList = new ArrayList<>();

        for (var ingredientId : createSupplierDTO.ingredientIDList()) {
            ingredientsList.add(ingredientService.getIngredientByID(ingredientId));
        }

        var supplier = new StockSupplier(
                createSupplierDTO.name(),
                createSupplierDTO.email(),
                createSupplierDTO.address(),
                ingredientsList
        );

        var supplierSaved = stockSupplierRepository.save(supplier);

        return supplierSaved.getStockSupplierID();
    }

    public void updateSupplier(long id, UpdateSupplierDTO updateSupplierDTO) {
        var supplier = this.getSupplierByID(id);

        if (updateSupplierDTO.name() != null && !updateSupplierDTO.name().isBlank()) {
            supplier.setName(updateSupplierDTO.name());
        }

        if (updateSupplierDTO.email() != null && !updateSupplierDTO.email().isBlank()) {
            supplier.setEmail(updateSupplierDTO.email());
        }

        if (updateSupplierDTO.address() != null && !updateSupplierDTO.address().isBlank()) {
            supplier.setAddress(updateSupplierDTO.address());
        }

        stockSupplierRepository.save(supplier);
    }

    public StockSupplier getSupplierByID(long id) {
        var ingredient = stockSupplierRepository.findById(id);

        if (ingredient.isEmpty()) {
            throw new IngredientNotFound("Fornecedor não encontrado");
        }

        return ingredient.get();
    }

    public void deleteSupplier(long id) {
        var supplier = getSupplierByID(id);

        stockSupplierRepository.deleteById(supplier.getStockSupplierID());
    }

    public List<StockSupplier> getAllSuppliers() {
        return stockSupplierRepository.findAll();
    }
}

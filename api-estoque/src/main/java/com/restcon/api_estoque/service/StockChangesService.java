package com.restcon.api_estoque.service;

import com.restcon.api_estoque.controller.stockChanges.CreateStockChangesDTO;
import com.restcon.api_estoque.controller.stockChanges.UpdateIngredientStockDTO;
import com.restcon.api_estoque.controller.stockChanges.UpdateStockChangesDTO;
import com.restcon.api_estoque.entity.StockChanges;
import com.restcon.api_estoque.entity.StockSupplier;
import com.restcon.api_estoque.exceptions.ChangeNotFound;
import com.restcon.api_estoque.repository.IngredientRepository;
import com.restcon.api_estoque.repository.StockChangesRepository;
import org.hibernate.sql.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StockChangesService {

    private final StockChangesRepository stockChangesRepository;
    private final IngredientRepository ingredientRepository;
    private final IngredientService ingredientService;
    private final StockSupplierService stockSupplierService;

    public StockChangesService(StockChangesRepository stockChangesRepository, IngredientService IngredientService, StockSupplierService stockSupplierService, IngredientRepository ingredientRepository) {
        this.stockChangesRepository = stockChangesRepository;
        this.ingredientService = IngredientService;
        this.stockSupplierService = stockSupplierService;
        this.ingredientRepository = ingredientRepository;
    }

    public long createStockChanges(CreateStockChangesDTO createStockChangesDTO) {

        Map<String, Float> ingredientsList = createStockChangesDTO.ingredients();

        for (Map.Entry<String, Float> ingredient : ingredientsList.entrySet()) {
            var ingredientEntity = ingredientService.getIngredientByID(Long.parseLong(ingredient.getKey()));

            ingredientEntity.ingredientConsume(ingredient.getValue());
        }

        StockSupplier supplier = null;

        if (createStockChangesDTO.supplier_ID() != null) {
            supplier = stockSupplierService.getSupplierByID(createStockChangesDTO.supplier_ID());
        }

        var stockChange = new StockChanges(
                createStockChangesDTO.cost(),
                createStockChangesDTO.type(),
                ingredientsList,
                supplier
        );

        var stockChangeSaved = stockChangesRepository.save(stockChange);

        return stockChangeSaved.getStockChangesID();
    }

    public void updateStockChanges(long id, UpdateStockChangesDTO updateStockChangesDTO) {
        var stockChange = this.getStockChangesByID(id);

        if (updateStockChangesDTO.cost() != null && updateStockChangesDTO.cost() > 0) {
            stockChange.setCost(updateStockChangesDTO.cost());
        }

        if (updateStockChangesDTO.type() != null) {
            stockChange.setType(updateStockChangesDTO.type());
        }

        if (updateStockChangesDTO.supplierID() != null) {
            stockChange.setSupplier(stockSupplierService.getSupplierByID(updateStockChangesDTO.supplierID()));
        }

        if (updateStockChangesDTO.ingredients() != null) {
            stockChange.setIngredients(updateStockChangesDTO.ingredients());
        }

        stockChangesRepository.save(stockChange);
    }

    public StockChanges getStockChangesByID(long id) {
        var stockChange = stockChangesRepository.findById(id);

        if (stockChange.isEmpty()) {
            throw new ChangeNotFound("Movimentação não encontrada");
        }

        return stockChange.get();
    }

    public void deleteStockChanges(long id) {
        stockChangesRepository.deleteById(id);
    }

    public List<StockChanges> getAllChanges() {
        return stockChangesRepository.findAll();
    }

    public void consumeIngredients(List<UpdateIngredientStockDTO> uisDTO) {

        for (var plate : uisDTO ) {
            for (Map.Entry<String, Double> ingredient : plate.ingredientsList().entrySet()){
                long id = Long.parseLong(ingredient.getKey());
                var ingredientEntity = ingredientService.getIngredientByID(id);

                var ingQuantity = ingredient.getValue().floatValue();

                ingredientEntity.ingredientConsume(-ingQuantity);

                var stockChange = new StockChanges(
                        0,
                        plate.type(),
                        Map.of(ingredient.getKey(), ingQuantity),
                        null
                );

                ingredientRepository.save(ingredientEntity);
                stockChangesRepository.save(stockChange);
            }
        }

    }
}

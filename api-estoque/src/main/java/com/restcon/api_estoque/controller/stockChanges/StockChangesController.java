package com.restcon.api_estoque.controller.stockChanges;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restcon.api_estoque.entity.StockChanges;
import com.restcon.api_estoque.service.StockChangesService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/movimentacoes")
public class StockChangesController {

    private final StockChangesService stockChangesService;

    public StockChangesController(StockChangesService stockChangesService) {
        this.stockChangesService = stockChangesService;
    }

    @PostMapping
    public ResponseEntity<StockChanges> createStockChanges(@RequestBody @Valid CreateStockChangesDTO createStockChangesDTO) {
        var changeId = stockChangesService.createStockChanges(createStockChangesDTO);

        return ResponseEntity.created(URI.create("/movimentacoes/id="+changeId)).build();
    }

    @GetMapping
    public ResponseEntity<List<StockChanges>> getAllChanges() {
        var changes = stockChangesService.getAllChanges();

        return ResponseEntity.ok(changes);
    }

    @GetMapping("/id={changeID}")
    public ResponseEntity<StockChanges> getStockChangesByID(@PathVariable("changeID") long changeID) {
        var change = stockChangesService.getStockChangesByID(changeID);

        return ResponseEntity.ok(change);
    }

    @PutMapping("/id={changeID}")
    public ResponseEntity<StockChanges> updateStockChange(@PathVariable("changeID") long changeID,
                                                          @RequestBody @Valid UpdateStockChangesDTO updateStockChangesDTO) {
        stockChangesService.updateStockChanges(changeID, updateStockChangesDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id={changeID}")
    public ResponseEntity<StockChanges> deleteStockChange(@PathVariable("changeID") long changeID) {
        stockChangesService.deleteStockChanges(changeID);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/updateStock")
    public ResponseEntity<StockChanges> updateStockConsume(@RequestBody @Valid List<UpdateIngredientStockDTO> uisDTO ) {
        stockChangesService.consumeIngredients(uisDTO);
        return  ResponseEntity.noContent().build();
    }
}

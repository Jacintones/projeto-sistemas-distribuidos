package com.restcon.api_cozinhas.controller.kitchen;

import com.restcon.api_cozinhas.entity.Kitchen;
import com.restcon.api_cozinhas.entity.Plate;
import com.restcon.api_cozinhas.service.KitchenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/cozinha")
public class KitchenController {

    private final KitchenService kitchenService;

    public KitchenController(KitchenService kitchenService) {
        this.kitchenService = kitchenService;
    }

    @PostMapping
    public ResponseEntity<Kitchen> createKitchen(@RequestBody @Valid CreateKitchenDTO CreateKitchenDTO) {
        var kitchen_ID = kitchenService.createKitchen(CreateKitchenDTO);

        return ResponseEntity.created(URI.create("/cozinha/id=" + kitchen_ID)).build();
    }

    @GetMapping
    public ResponseEntity<List<Kitchen>> getAllKitchens() {
        var kitchens = kitchenService.getKithenList();

        return ResponseEntity.ok(kitchens);
    }

    @GetMapping("/id={kitchen_ID}")
    public ResponseEntity<Kitchen> getKitchenById(@PathVariable("kitchen_ID") Long kitchen_ID) {
        var kitchen = kitchenService.getKitchenById(kitchen_ID);

        if (kitchen.isPresent()) {
            return ResponseEntity.ok(kitchen.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/id={kitchen_ID}")
    public ResponseEntity<Void> updateKitchenByID(@PathVariable("kitchen_ID") Long kitchen_ID,
                                                  @RequestBody UpdateKitchenDTO updateKitchenDTO) {
        kitchenService.updateKitchenByID(kitchen_ID, updateKitchenDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id={kitchen_ID}")
    public ResponseEntity<Void> deleteKitchenById(@PathVariable("kitchen_ID") Long kitchen_ID) {
        kitchenService.deleteKitchenById(kitchen_ID);
        return ResponseEntity.noContent().build();
    }
}

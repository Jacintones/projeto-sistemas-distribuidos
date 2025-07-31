package com.restcon.api_cozinhas.controller.plate;

import com.restcon.api_cozinhas.entity.Plate;
import com.restcon.api_cozinhas.service.PlateService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/prato")
public class PlateController {

    private final PlateService plateService;

    public PlateController(PlateService plateService) {
        this.plateService = plateService;
    }

    @PostMapping
    public ResponseEntity<Plate> createPlate(@RequestBody @Valid CreatePlateDTO createPlateDTO) {
        var plate_ID = plateService.createPlate(createPlateDTO);

        return ResponseEntity.created(URI.create("/prato/id=" + plate_ID)).build();
    }

    @GetMapping
    public ResponseEntity<List<Plate>> getAllPlates() {
        var plates = plateService.getPlateList();

        return ResponseEntity.ok(plates);
    }

    @GetMapping("/kitchen={kitchen_ID}")
    public ResponseEntity<List<Plate>> getPlatesByKitchenId(@PathVariable("kitchen_ID") Long kitchen_ID) {
        var plates = plateService.getPlatesByKitchenId(kitchen_ID);
        return ResponseEntity.ok(plates);
    }

    @GetMapping("/id={plate_ID}")
    public ResponseEntity<Plate> getPlateById(@PathVariable("plate_ID") Long plate_ID) {
        var plate = plateService.getPlateById(plate_ID);

        if (plate.isPresent()) {
            return ResponseEntity.ok(plate.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/id={plate_ID}")
    public ResponseEntity<Void> updateOrderByID(@PathVariable("plate_ID") Long plate_ID,
                                                @RequestBody UpdatePlateDTO updatePlateDTO) {
        plateService.updatePlateById(plate_ID, updatePlateDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id={plate_ID}")
    public ResponseEntity<Void> deletePlateById(@PathVariable("plate_ID") Long plate_ID) {
        plateService.deletePlateById(plate_ID);
        return ResponseEntity.noContent().build();
    }
}

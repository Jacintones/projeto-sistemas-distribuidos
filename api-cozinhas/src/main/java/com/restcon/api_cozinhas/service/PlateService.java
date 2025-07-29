package com.restcon.api_cozinhas.service;

import com.restcon.api_cozinhas.controller.plate.CreatePlateDTO;
import com.restcon.api_cozinhas.controller.plate.UpdatePlateDTO;
import com.restcon.api_cozinhas.entity.Plate;
import com.restcon.api_cozinhas.exceptions.KitchenNotFound;
import com.restcon.api_cozinhas.exceptions.PlateNotFound;
import com.restcon.api_cozinhas.repository.PlateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlateService {

    private final PlateRepository plateRepository;
    private final KitchenService kitchenService;

    public PlateService(PlateRepository repository, KitchenService kitchenService) {
        this.plateRepository = repository;
        this.kitchenService = kitchenService;
    }

    public long createPlate(CreatePlateDTO createPlateDTO) {
        var kitchen = kitchenService.getKitchenById(createPlateDTO.kitchen_ID().longValue());

        if (kitchen.isEmpty()) {
            throw new KitchenNotFound();
        }

        var plate = new Plate(
            createPlateDTO.name(),
            createPlateDTO.recipe(),
            createPlateDTO.price(),
            createPlateDTO.description(),
            kitchen.get(),
            createPlateDTO.ingredients()
        );

        var savedPlate = plateRepository.save(plate);

        return savedPlate.getPlate_ID();
    }

    public List<Plate> getPlateList() {
        return plateRepository.findAll();
    }


    public List<Plate> getPlatesByKitchenId(Long kitchen_ID) {
        var kitchen = kitchenService.getKitchenById(kitchen_ID);

        if (kitchen.isEmpty()) {
            return List.of();
        }

        return plateRepository.findBykitchen(kitchen.get());
    }

    public Optional<Plate> getPlateById(Long plate_ID) {
        return plateRepository.findById(plate_ID);
    }

    public void deletePlateById(Long plate_ID) {
        var plateExists = plateRepository.existsById(plate_ID);

        if (!plateExists) {
            throw new KitchenNotFound();
        }

        plateRepository.deleteById(plate_ID);
    }

    public void updatePlateById(Long plate_ID, UpdatePlateDTO updatePlateDTO) {
        var plateEntity = plateRepository.findById(plate_ID);

        if (plateEntity.isEmpty()) {
            throw new PlateNotFound();
        }

        var plate = plateEntity.get();

        var newKitchenID = updatePlateDTO.kitchen_ID();

        if (newKitchenID != null) {
            var kitchen = kitchenService.getKitchenById(newKitchenID.longValue());

            if (kitchen.isEmpty()) {
                throw new KitchenNotFound();
            }

            plate.setKitchen(kitchen.get());
        }

        if(updatePlateDTO.name() != null && !updatePlateDTO.name().isBlank()) {
            plate.setName(updatePlateDTO.name());
        }

        if(updatePlateDTO.recipe() != null && !updatePlateDTO.recipe().isBlank()) {
            plate.setRecipe(updatePlateDTO.recipe());
        }

        if(updatePlateDTO.price() != null && updatePlateDTO.price() > 0) {
            plate.setPrice(updatePlateDTO.price());
        }

        if(updatePlateDTO.description() != null && !updatePlateDTO.description().isBlank()) {
            plate.setDescription(updatePlateDTO.description());
        }

        if(!updatePlateDTO.ingredients().isEmpty()) {
            plate.setIngredients(updatePlateDTO.ingredients());
        }
        
        plateRepository.save(plate);

    }

}

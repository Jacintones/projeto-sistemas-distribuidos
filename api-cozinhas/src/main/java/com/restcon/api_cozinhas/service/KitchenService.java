package com.restcon.api_cozinhas.service;

import com.restcon.api_cozinhas.controller.kitchen.CreateKitchenDTO;
import com.restcon.api_cozinhas.controller.kitchen.UpdateKitchenDTO;
import com.restcon.api_cozinhas.entity.Kitchen;
import com.restcon.api_cozinhas.exceptions.KitchenNotFound;
import com.restcon.api_cozinhas.repository.KitchenRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class KitchenService {

    KitchenRepository kitchenRepository;

    public KitchenService(KitchenRepository kitchenRepository) {
        this.kitchenRepository = kitchenRepository;
    }

    public long createKitchen(CreateKitchenDTO createKitchenDTO) {
        var kitchen = new Kitchen(
            createKitchenDTO.name(),
            createKitchenDTO.description()
        );

        System.out.println(kitchen);

        var savedKitchen = kitchenRepository.save(kitchen);

        return savedKitchen.getKitchen_ID();
    }

    public List<Kitchen> getKithenList() {
        return kitchenRepository.findAll();
    }

    public Optional<Kitchen> getKitchenById(Long kitchen_ID) {
        return kitchenRepository.findById(kitchen_ID);
    }

    public void updateKitchenByID(Long kitchen_ID, UpdateKitchenDTO updateKitchenDTO) {
        var kitchenEntity = kitchenRepository.findById(kitchen_ID);

        if (kitchenEntity.isEmpty()) {
            throw new KitchenNotFound();
        }

        var kitchen = kitchenEntity.get();

        if(updateKitchenDTO.name() != null && !updateKitchenDTO.name().isBlank()) {
            kitchen.setName(updateKitchenDTO.name());
        }

        if(updateKitchenDTO.description() != null && !updateKitchenDTO.description().isBlank()) {
            kitchen.setDescription(updateKitchenDTO.description());
        }

        kitchenRepository.save(kitchen);
    }

    public void deleteKitchenById(Long kitchen_ID) {
        var kitchenExists = kitchenRepository.existsById(kitchen_ID);

        if (!kitchenExists) {
            throw new KitchenNotFound();
        }

        kitchenRepository.deleteById(kitchen_ID);
    }
}

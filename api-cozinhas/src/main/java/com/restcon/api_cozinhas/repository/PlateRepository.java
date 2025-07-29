package com.restcon.api_cozinhas.repository;

import com.restcon.api_cozinhas.entity.Kitchen;
import com.restcon.api_cozinhas.entity.Plate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlateRepository extends JpaRepository<Plate, Long> {

    List<Plate> findBykitchen(Kitchen kitchen);

}

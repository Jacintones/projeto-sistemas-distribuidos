package com.restcon.api_cozinhas.repository;

import com.restcon.api_cozinhas.entity.Kitchen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KitchenRepository extends JpaRepository<Kitchen, Long> {
}

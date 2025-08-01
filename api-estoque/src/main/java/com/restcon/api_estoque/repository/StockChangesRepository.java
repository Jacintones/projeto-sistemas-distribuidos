package com.restcon.api_estoque.repository;

import com.restcon.api_estoque.entity.StockChanges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockChangesRepository extends JpaRepository<StockChanges, Long> {
}

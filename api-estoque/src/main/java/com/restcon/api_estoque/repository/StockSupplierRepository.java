package com.restcon.api_estoque.repository;

import com.restcon.api_estoque.entity.StockSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockSupplierRepository extends JpaRepository<StockSupplier, Long> {
}

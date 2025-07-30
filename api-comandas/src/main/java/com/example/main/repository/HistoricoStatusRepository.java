package com.example.main.repository;


import com.example.main.model.HistoricoStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoricoStatusRepository extends JpaRepository<HistoricoStatus, Long> {
    List<HistoricoStatus> findByPedidoId(Long pedidoId);
}
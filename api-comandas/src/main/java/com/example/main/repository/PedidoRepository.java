package com.example.main.repository;


import com.example.main.model.Pedido;
import com.example.main.model.StatusComandaEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByStatus(StatusComandaEnum status);

    @Query("SELECT p FROM Pedido p WHERE p.mesa.numero = :numero")
    List<Pedido> findByMesaNumero(String numero);
}
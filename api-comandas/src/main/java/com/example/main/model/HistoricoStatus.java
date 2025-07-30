package com.example.main.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class HistoricoStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long pedidoId;

    @Enumerated(EnumType.STRING)
    private StatusComandaEnum status;

    private LocalDateTime alteradoEm;

    public HistoricoStatus() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPedidoId() {
        return pedidoId;
    }

    public void setPedidoId(Long pedidoId) {
        this.pedidoId = pedidoId;
    }

    public StatusComandaEnum getStatus() {
        return status;
    }

    public void setStatus(StatusComandaEnum status) {
        this.status = status;
    }

    public LocalDateTime getAlteradoEm() {
        return alteradoEm;
    }

    public void setAlteradoEm(LocalDateTime alteradoEm) {
        this.alteradoEm = alteradoEm;
    }
}
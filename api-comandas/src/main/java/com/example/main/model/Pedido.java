package com.example.main.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Mesa mesa;

    private String garcomResponsavel;
    private LocalDateTime criadoEm;

    @ElementCollection
    private List<String> itens;

    @Enumerated(EnumType.STRING)
    private StatusComandaEnum status;

    private boolean enviadoParaCozinha;

    public Pedido() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Mesa getMesa() {
        return mesa;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }

    public String getGarcomResponsavel() {
        return garcomResponsavel;
    }

    public void setGarcomResponsavel(String garcomResponsavel) {
        this.garcomResponsavel = garcomResponsavel;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public List<String> getItens() {
        return itens;
    }

    public void setItens(List<String> itens) {
        this.itens = itens;
    }

    public StatusComandaEnum getStatus() {
        return status;
    }

    public void setStatus(StatusComandaEnum status) {
        this.status = status;
    }

    public boolean isEnviadoParaCozinha() {
        return enviadoParaCozinha;
    }

    public void setEnviadoParaCozinha(boolean enviadoParaCozinha) {
        this.enviadoParaCozinha = enviadoParaCozinha;
    }
}
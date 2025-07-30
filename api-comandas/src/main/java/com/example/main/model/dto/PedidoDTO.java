package com.example.main.model.dto;

import java.util.List;

public class PedidoDTO {
    private Long mesaId;
    private String garcomResponsavel;
    private List<String> itens;

    public PedidoDTO() {}

    public PedidoDTO(Long mesaId, String garcomResponsavel, List<String> itens) {
        this.mesaId = mesaId;
        this.garcomResponsavel = garcomResponsavel;
        this.itens = itens;
    }

    public Long getMesaId() {
        return mesaId;
    }

    public void setMesaId(Long mesaId) {
        this.mesaId = mesaId;
    }

    public String getGarcomResponsavel() {
        return garcomResponsavel;
    }

    public void setGarcomResponsavel(String garcomResponsavel) {
        this.garcomResponsavel = garcomResponsavel;
    }

    public List<String> getItens() {
        return itens;
    }

    public void setItens(List<String> itens) {
        this.itens = itens;
    }
}

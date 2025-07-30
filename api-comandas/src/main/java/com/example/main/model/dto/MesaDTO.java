package com.example.main.model.dto;

public class MesaDTO {
    private String numero;

    public MesaDTO() {}

    public MesaDTO(String numero) {
        this.numero = numero;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}

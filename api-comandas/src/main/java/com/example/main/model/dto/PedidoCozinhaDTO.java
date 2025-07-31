package com.example.main.model.dto;

import java.util.List;

public class PedidoCozinhaDTO {
    private int table_number;
    private String waiter;
    private List<PratoDTO> plates;

    public PedidoCozinhaDTO() {}

    public PedidoCozinhaDTO(int table_number, String waiter, List<PratoDTO> plates) {
        this.table_number = table_number;
        this.waiter = waiter;
        this.plates = plates;
    }

    public int getTable_number() {
        return table_number;
    }

    public void setTable_number(int table_number) {
        this.table_number = table_number;
    }

    public String getWaiter() {
        return waiter;
    }

    public void setWaiter(String waiter) {
        this.waiter = waiter;
    }

    public List<PratoDTO> getPlates() {
        return plates;
    }

    public void setPlates(List<PratoDTO> plates) {
        this.plates = plates;
    }
}

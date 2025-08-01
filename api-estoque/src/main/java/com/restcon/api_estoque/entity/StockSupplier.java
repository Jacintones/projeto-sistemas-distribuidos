package com.restcon.api_estoque.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "stockSupplier")
@Getter
@Setter
@NoArgsConstructor
public class StockSupplier {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stockSupplierID;

    private String name;
    private String email;
    private String address;

    @OneToMany
    @JsonManagedReference
    private List<Ingredients> ingredients;

    public StockSupplier(String name, String email,String address, List<Ingredients> ingredients) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.ingredients = ingredients;
    }

}

package com.restcon.api_estoque.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@NoArgsConstructor
public class Ingredients {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long ingredientsID;

    private String name;

    private Float quantity;

    private String unit;

    @ManyToOne
    @JoinColumn(name = "supplierID", referencedColumnName = "stockSupplierID")
    @JsonBackReference
    private StockSupplier supplier;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public void ingredientConsume(Float quantity)
    {
        if (quantity > this.quantity) {
            this.quantity = 0.0F;
        } else {
            this.quantity += quantity;
        }
    }

    public Ingredients(String name, String unit) {
        this.name = name;
        this.unit = unit;
        this.quantity = 0.0F;
    }
}

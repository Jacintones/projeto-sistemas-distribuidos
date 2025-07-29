package com.restcon.api_cozinhas.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@NoArgsConstructor
public class Ingredients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingredients_ID;

    @ManyToOne
    @JoinColumn(name = "plate_ID")
    @JsonBackReference
    private Plate plate;

    private float quantity;

    public Ingredients(Plate plate, float quantity) {
        this.plate = plate;
        this.quantity = quantity;
    }
}

package com.restcon.api_cozinhas.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "Plates")
@Getter
@Setter
@ToString(exclude = {"kitchen", "orders"})
@NoArgsConstructor
public class Plate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long plate_ID;

    @ManyToOne
    @JoinColumn(name = "kitchen_ID")
    @JsonBackReference
    private Kitchen kitchen;

    @ManyToMany
    @JsonBackReference
    private List<Order> orders;

    private String name;
    private String recipe;
    private int price;
    private String description;
    private boolean available;

    @ElementCollection
    @MapKeyColumn(name = "ingredient_ID")
    @Column(name = "quantity")
    private Map<Long, Double> ingredients;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public Plate(String name, String recipe, int price, String description, Kitchen kitchen, Map<Long, Double> ingredients) {
        this.name = name;
        this.recipe = recipe;
        this.price = price;
        this.description = description;
        this.kitchen = kitchen;
        this.ingredients = ingredients;
        this.available = true;
    }
}

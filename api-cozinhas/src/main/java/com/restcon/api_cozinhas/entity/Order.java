package com.restcon.api_cozinhas.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_ID;

    private int table_number;

    private String waiter;

    private boolean active;

    @CreationTimestamp
    private Instant createdAt;

    private Instant finishedAt;

    @ManyToMany
    @JsonManagedReference
    private List<Plate> plates;

    public Order(int table_number, String waiter, List<Plate> plates) {
        this.table_number = table_number;
        this.waiter = waiter;
        this.plates = plates;
        this.active = true;
    }

}

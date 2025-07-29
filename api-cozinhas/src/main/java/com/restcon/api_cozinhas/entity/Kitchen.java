package com.restcon.api_cozinhas.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "Kitchen")
@Getter
@Setter
@ToString(exclude = "plates")
@NoArgsConstructor
public class Kitchen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long kitchen_ID;

    private String name;

    private String description;

    @OneToMany(mappedBy = "kitchen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Plate> plates;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public Kitchen(String name, String description) {
        this.name = name;
        this.description = description;
    }
}



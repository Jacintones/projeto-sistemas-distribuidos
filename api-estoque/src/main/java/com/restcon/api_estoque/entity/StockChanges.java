package com.restcon.api_estoque.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.Map;

@Entity
@Table(name = "stock_changes")
@Getter
@Setter
@NoArgsConstructor
public class StockChanges {

    public enum StockChangesTypes {
        CONSUMO_PRATO,
        NOVO_ESTOQUE,
        AJUSTE_MANUAL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stockChangesID;

    private Integer cost;

    @Enumerated(EnumType.STRING)
    private StockChangesTypes type;

    @OneToOne
    private StockSupplier supplier;

    @CreationTimestamp
    private Instant date;


    @ElementCollection
    @MapKeyColumn(name = "ingredientID")
    @Column(name = "quantity")
    private Map<String, Float> ingredients;

    public StockChanges(Integer cost, StockChangesTypes type, Map<String, Float> ingredients, StockSupplier supplier) {
        this.cost = cost;
        this.type = type;
        this.ingredients = ingredients;
        this.supplier = supplier;
    }

}

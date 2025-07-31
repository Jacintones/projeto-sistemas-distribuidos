package com.example.main.controller;

import com.example.main.model.Mesa;
import com.example.main.service.MesaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mesas")
public class MesaController {

    private final MesaService mesaService;

    public MesaController(MesaService mesaService) {
        this.mesaService = mesaService;
    }

    @PostMapping
    public ResponseEntity<Mesa> criarMesa(@RequestBody Mesa mesa) {
        Mesa novaMesa = mesaService.criarMesa(mesa);
        return ResponseEntity.ok(novaMesa);
    }

    @GetMapping
    public ResponseEntity<List<Mesa>> getAllMesas() {
        List<Mesa> mesas = mesaService.obterTodasAsMesas();
        return ResponseEntity.ok(mesas);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Mesa> alterarStatusMesa(@PathVariable Long id, @RequestBody Mesa mesa) {
        Mesa mesaAtualizada = mesaService.alterarStatusMesa(id, mesa);
        return ResponseEntity.ok(mesaAtualizada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mesa> atualizarMesa(@PathVariable Long id, @RequestBody Mesa mesa) {
        Mesa mesaAtualizada = mesaService.atualizarMesa(id, mesa);
        return ResponseEntity.ok(mesaAtualizada);
    }
}

package com.example.main.controller;

import com.example.main.model.Pedido;
import com.example.main.model.StatusComandaEnum;
import com.example.main.model.dto.PedidoDTO;
import com.example.main.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comandas")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<Pedido> criar(@RequestBody PedidoDTO dto) {
        Pedido pedido = pedidoService.criarPedido(dto);
        return ResponseEntity.ok(pedido);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> obterTodosPedidos() {
        List<Pedido> pedidos = pedidoService.obterTodosPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obterPedidoPorId(@PathVariable Long id) {
        Pedido pedido = pedidoService.obterPedidoPorId(id);
        return ResponseEntity.ok(pedido);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Pedido> atualizarStatus(@PathVariable Long id, @RequestBody StatusComandaEnum status) {
        Pedido pedido = pedidoService.atualizarStatus(id, status);
        return ResponseEntity.ok(pedido);
    }

    @PutMapping("/{id}/enviar-para-cozinha")
    public ResponseEntity<Pedido> enviarParaCozinha(@PathVariable Long id) {
        Pedido pedido = pedidoService.enviarParaCozinha(id);
        return ResponseEntity.ok(pedido);
    }
}

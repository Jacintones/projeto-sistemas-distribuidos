package com.example.main.controller;

import com.example.main.model.Mesa;
import com.example.main.model.Pedido;
import com.example.main.model.StatusComandaEnum;
import com.example.main.model.dto.PedidoDTO;
import com.example.main.repository.MesaRepository;
import com.example.main.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comandas")
public class PedidoController {

    private final PedidoService pedidoService;
    private final MesaRepository mesaRepository;

    public PedidoController(PedidoService pedidoService, MesaRepository mesaRepository) {
        this.pedidoService = pedidoService;
        this.mesaRepository = mesaRepository;
    }

    @PostMapping
    public ResponseEntity<Pedido> criar(@RequestBody PedidoDTO dto) {
        Mesa mesa = mesaRepository.findById(dto.getMesaId())
                .orElseThrow(() -> new RuntimeException("Mesa não encontrada"));

        Pedido pedido = new Pedido();
        pedido.setMesa(mesa);
        pedido.setGarcomResponsavel(dto.getGarcomResponsavel());
        pedido.setItens(dto.getItens());
        pedido.setStatus(StatusComandaEnum.CRIADO);
        pedido.setCriadoEm(LocalDateTime.now());
        pedido.setEnviadoParaCozinha(false);

        Pedido novoPedido = pedidoService.criarPedido(dto);
        return ResponseEntity.ok(novoPedido);
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

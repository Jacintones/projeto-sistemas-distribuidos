package com.example.main.service;

import com.example.main.model.Pedido;
import com.example.main.model.StatusComandaEnum;
import com.example.main.model.Mesa;
import com.example.main.model.dto.PedidoCozinhaDTO;
import com.example.main.model.dto.PedidoDTO;
import com.example.main.model.dto.PratoDTO;
import com.example.main.repository.PedidoRepository;
import com.example.main.repository.MesaRepository;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final MesaRepository mesaRepository;

    public PedidoService(PedidoRepository pedidoRepository, MesaRepository mesaRepository) {
        this.pedidoRepository = pedidoRepository;
        this.mesaRepository = mesaRepository;
    }

    @Transactional
    public Pedido criarPedido(PedidoDTO pedidoDTO) {
        Optional<Mesa> mesaOpt = mesaRepository.findById(pedidoDTO.getMesaId());
        if (mesaOpt.isEmpty()) {
            throw new RuntimeException("Mesa não encontrada");
        }

        Mesa mesa = mesaOpt.get();

        Pedido pedido = new Pedido();
        pedido.setMesa(mesa);
        pedido.setGarcomResponsavel(pedidoDTO.getGarcomResponsavel());
        pedido.setItens(pedidoDTO.getItens());
        pedido.setStatus(StatusComandaEnum.CRIADO);
        pedido.setCriadoEm(java.time.LocalDateTime.now());
        pedido.setEnviadoParaCozinha(false);

        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido atualizarStatus(Long pedidoId, StatusComandaEnum status) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(status);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> obterTodosPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido obterPedidoPorId(Long pedidoId) {
        return pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    private final RestTemplate restTemplate = new RestTemplate();

    public String enviarParaCozinha(PedidoDTO pedidoDTO, String numeroMesa) {
        final String url = "http://localhost:8081/api/cozinha/pedidos";

        int numero = Integer.parseInt(numeroMesa);

        List<PratoDTO> pratos = pedidoDTO.getItens().stream()
                .map(PratoDTO::new)
                .collect(Collectors.toList());

        PedidoCozinhaDTO dto = new PedidoCozinhaDTO(
                numero,
                pedidoDTO.getGarcomResponsavel(),
                pratos
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<PedidoCozinhaDTO> request = new HttpEntity<>(dto, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            System.out.println("Resposta da Cozinha: " + response.getBody());

        } catch (Exception e) {
            System.err.println("Erro ao enviar pedido para cozinha: " + e.getMessage());
        }
        return url;
    }
}
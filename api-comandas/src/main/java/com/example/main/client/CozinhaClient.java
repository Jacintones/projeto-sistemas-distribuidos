package com.example.main.client;


import com.example.main.model.dto.PedidoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "cozinha-service", path = "/cozinha")
public interface CozinhaClient {

    @PostMapping("/receber-pedido")
    void enviarPedido(@RequestBody PedidoDTO pedido);
}

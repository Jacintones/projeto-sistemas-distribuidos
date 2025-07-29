package com.restcon.api_cozinhas.controller.order;

import com.restcon.api_cozinhas.entity.Order;
import com.restcon.api_cozinhas.service.OrderService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pedido")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody @Valid CreateOrderDTO createOrderDTO) {
        var order_ID = orderService.createOrder(createOrderDTO);

        return ResponseEntity.created(URI.create("/pedido/id=" + order_ID)).build();
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        var orders = orderService.getOrderList();

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/id={order_ID}")
    public ResponseEntity<Order> getOrderById(@PathVariable("order_ID") Long order_ID) {
        var order = orderService.getOrderById(order_ID);

        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/id={order_ID}")
    public ResponseEntity<Void> updateOrderByID(@PathVariable("order_ID") Long order_ID,
                                                  @RequestBody UpdateOrderDTO updateOrderDTO) {
        orderService.updateOrderByID(order_ID, updateOrderDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/id={oder_ID}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable("oder_ID") Long order_ID) {
        orderService.deleteOrderById(order_ID);
        return ResponseEntity.noContent().build();
    }

}

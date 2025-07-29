package com.restcon.api_cozinhas.service;

import com.restcon.api_cozinhas.controller.order.CreateOrderDTO;
import com.restcon.api_cozinhas.controller.order.UpdateOrderDTO;
import com.restcon.api_cozinhas.entity.Order;
import com.restcon.api_cozinhas.entity.Plate;
import com.restcon.api_cozinhas.exceptions.OrderNotFound;
import com.restcon.api_cozinhas.exceptions.PlateNotFound;
import com.restcon.api_cozinhas.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PlateService plateService;

    public OrderService(OrderRepository orderRepository, PlateService plateService) {
        this.orderRepository = orderRepository;
        this.plateService = plateService;
    }

    public long createOrder(CreateOrderDTO createOrderDTO) {

        List<Plate> plates = new ArrayList<>();

        for (var plateId : createOrderDTO.plates()) {
            var plate = plateService.getPlateById(plateId);

            if(!plate.isPresent()) {
                throw new PlateNotFound();
            }

            plates.add(plate.get());
        }

        System.out.println(plates);

        var order = new Order(
                createOrderDTO.table_number(),
                createOrderDTO.waiter(),
                plates
        );

        System.out.println(order);

        var savedOrder = orderRepository.save(order);

        return savedOrder.getOrder_ID();
    }

    public List<Order> getOrderList() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long order_ID) {
        return orderRepository.findById(order_ID);
    }

    public void updateOrderByID(Long order_ID, UpdateOrderDTO updateOrderDTO) {
        var orderEntity = orderRepository.findById(order_ID);

        if (orderEntity.isEmpty()) {
            throw new OrderNotFound();
        }

        var order = orderEntity.get();

        if(updateOrderDTO.table_number() != null && updateOrderDTO.table_number() > 0) {
            order.setTable_number(updateOrderDTO.table_number());
        }

        if(updateOrderDTO.waiter() != null && !updateOrderDTO.waiter().isBlank()) {
            order.setWaiter(updateOrderDTO.waiter());
        }

        orderRepository.save(order);
    }

    public void deleteOrderById(Long order_ID) {
        var orderExists = orderRepository.existsById(order_ID);

        if (!orderExists) {
            throw new OrderNotFound();
        }

        orderRepository.deleteById(order_ID);
    }

}

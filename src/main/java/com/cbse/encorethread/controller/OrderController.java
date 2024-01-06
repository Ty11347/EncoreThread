package com.cbse.encorethread.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbse.encorethread.dto.OrdersDTO;
import com.cbse.encorethread.model.Orders;
import com.cbse.encorethread.service.OrdersService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrdersService ordersService;

  public OrderController(OrdersService ordersService) {
    this.ordersService = ordersService;
  }

  @GetMapping
  public List<Orders> getAllOrders() {
    return ordersService.getAllOrders();
  }

  @GetMapping("/order/{id}")
  public Orders getOrderById(@PathVariable Integer id) {
    return ordersService.getOrderById(id);
  }

  @GetMapping("/user/{userId}")
  public List<Orders> getOrdersByUserId(@PathVariable Long userId) {
    return ordersService.getOrdersByUserId(userId);
  }

  @PostMapping
  public Orders createOrder(@RequestBody Orders order) {
    return ordersService.createOrder(order);
  }

  @PostMapping("/dto")
  public Orders createOrder(@RequestBody OrdersDTO orderdto) {
    return ordersService.createOrderByDTO(orderdto);
  }

  @DeleteMapping("order/{id}")
  public void deleteOrderById(@PathVariable Integer id) {
    ordersService.deleteOrderById(id);
  }

  @DeleteMapping("user/{userId}")
  public void deleteOrderByUserId(@PathVariable Long userId) {
    ordersService.deleteOrderByUserId(userId);
  }

  @PutMapping("/update")
  public Orders updatOrders(@RequestBody Orders order) {
    return ordersService.updateOrder(order);
  }
}

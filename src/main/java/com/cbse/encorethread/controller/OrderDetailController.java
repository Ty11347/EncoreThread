package com.cbse.encorethread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbse.encorethread.dto.OrderDetailsDTO;
import com.cbse.encorethread.model.OrderDetails;
import com.cbse.encorethread.service.OrderDetailsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orderdetails")
public class OrderDetailController {
  @Autowired
  private OrderDetailsService orderDetailsService;

  @GetMapping("/{id}")
  public OrderDetails getOrderDetailById(@PathVariable Integer id) {
    return orderDetailsService.getOrderDetailById(id);
  }

  @GetMapping("/order/{orderId}")
  public List<OrderDetailsDTO> getOrderDetailsByOrderId(@PathVariable Integer orderId) {
    return orderDetailsService.getOrderDetailsByOrderId(orderId);
  }

  @PostMapping
  public OrderDetails createOrderDetails(@RequestBody OrderDetails orderDetails) {
    return orderDetailsService.createOrderDetails(orderDetails);
  }

  @DeleteMapping
  public void deleteOrderDetails(@PathVariable Integer id) {
    orderDetailsService.deleteOrderDetails(id);
  }
}

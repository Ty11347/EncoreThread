package com.cbse.encorethread.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cbse.encorethread.model.Orders;
import com.cbse.encorethread.repository.OrdersRepository;

@Service
public class OrdersService {
  private final OrdersRepository ordersRepository;

  public OrdersService(OrdersRepository ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  public List<Orders> getAllOrders() {
    List<Orders> orders = ordersRepository.findAll();
    orders.sort((o1, o2) -> o1.getId() - o2.getId());
    return orders;
  }

  public Orders getOrderById(Integer id) {
    return ordersRepository.findById(id).get();
  }

  public List<Orders> getOrdersByUserId(Long userId) {
    List<Orders> orders = ordersRepository.findByUserId(userId);
    orders.sort((o1, o2) -> o1.getId() - o2.getId());
    return orders;
  }

  public Orders createOrder(Orders order) {
    order.setId(ordersRepository.findLatestId() + 1);
    return ordersRepository.save(order);
  }

  public void deleteOrder(Integer id) {
    ordersRepository.deleteById(id);
  }

  public Orders updateOrder(Orders order) {
    return ordersRepository.save(order);
  } 
}

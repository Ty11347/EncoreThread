package com.cbse.encorethread.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbse.encorethread.dto.OrdersDTO;
import com.cbse.encorethread.model.OrderDetails;
import com.cbse.encorethread.model.Orders;
import com.cbse.encorethread.repository.OrderDetailsRepository;
import com.cbse.encorethread.repository.OrdersRepository;

@Service
public class OrdersService {
  private final OrdersRepository ordersRepository;

  @Autowired
  private OrderDetailsRepository orderDetailsRepository;

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

  public Orders createOrderByDTO(OrdersDTO orderdto) {
    Orders order = new Orders(
      orderdto.getUserId(),
      orderdto.getOrderStatus(),
      orderdto.getTotalPrice(),
      orderdto.getAddress(),
      orderdto.getOrderDate()
    );
    order.setId(ordersRepository.findLatestId() + 1);
    order = ordersRepository.save(order);
    OrderDetails[] orderDetails = new OrderDetails[orderdto.getProductIds().length];
    for (int i = 0; i < orderdto.getProductIds().length; i++) {
      orderDetails[i] = new OrderDetails(
        order.getId(),
        orderdto.getProductIds()[i],
        orderdto.getQuantities()[i],
        orderdto.getPrices()[i]
      );
      orderDetails[i].setId(orderDetailsRepository.findLatestId() + 1);
      orderDetailsRepository.save(orderDetails[i]);
    }
    return order;
  }

  public void deleteOrder(Integer id) {
    ordersRepository.deleteById(id);
  }

  public Orders updateOrder(Orders order) {
    return ordersRepository.save(order);
  } 
}

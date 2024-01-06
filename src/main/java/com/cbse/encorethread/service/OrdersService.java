package com.cbse.encorethread.service;

import java.util.List;
import java.util.Optional;

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
    Optional<Integer> temp = ordersRepository.findLatestId();
    Integer orderId;
    if (temp.isEmpty()) {
      orderId = 0;
    } else {
      orderId = temp.get();
    }
    order.setId(++orderId);
    if (order.getId() == null) {
      order.setId(1);
    }
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
    Optional<Integer> temp = ordersRepository.findLatestId();
    Integer orderId;
    if (temp.isEmpty()) {
      orderId = 0;
    } else {
      orderId = temp.get();
    }
    order.setId(++orderId);
    order = ordersRepository.save(order);
    OrderDetails[] orderDetails = new OrderDetails[orderdto.getProductIds().length];
    for (int i = 0; i < orderdto.getProductIds().length; i++) {
      orderDetails[i] = new OrderDetails(
        order.getId(),
        orderdto.getProductIds()[i],
        orderdto.getQuantities()[i],
        orderdto.getPrices()[i]
      );
      temp = orderDetailsRepository.findLatestId();
      Integer orderDetailsId;
      if (temp.isEmpty()) {
        orderDetailsId = 0;
      } else {
        orderDetailsId = temp.get();
      }
      orderDetails[i].setId(++orderDetailsId);
      orderDetailsRepository.save(orderDetails[i]);
    }
    return order;
  }

  public void deleteOrderById(Integer id) {
    orderDetailsRepository.deleteByOrderId(id);
    ordersRepository.deleteById(id);
  }

  public void deleteOrderByUserId(Long userId) {
    for (Orders order : ordersRepository.findByUserId(userId)) {
      orderDetailsRepository.deleteByOrderId(order.getId());
    }
    ordersRepository.deleteByUserId(userId);
  }

  public Orders updateOrder(Orders order) {
    return ordersRepository.save(order);
  } 
}

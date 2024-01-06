package com.cbse.encorethread.service;

import java.util.List;

import com.cbse.encorethread.dto.OrdersDTO;
import com.cbse.encorethread.model.Orders;

public interface OrdersService {
  public List<Orders> getAllOrders();

  public Orders getOrderById(Integer id);

  public List<Orders> getOrdersByUserId(Long userId);

  public Orders createOrder(Orders order);

  public Orders createOrderByDTO(OrdersDTO orderdto);

  public void deleteOrderById(Integer id);

  public void deleteOrderByUserId(Long userId);

  public Orders updateOrder(Orders order);
}

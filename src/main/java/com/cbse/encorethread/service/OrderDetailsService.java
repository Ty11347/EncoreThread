package com.cbse.encorethread.service;

import java.util.List;

import com.cbse.encorethread.dto.OrderDetailsDTO;
import com.cbse.encorethread.model.OrderDetails;

public interface OrderDetailsService {
  public OrderDetails getOrderDetailById(Integer id);

  public List<OrderDetailsDTO> getOrderDetailsByOrderId(Integer orderId);

  public OrderDetails createOrderDetails(OrderDetails orderDetails);

  public void deleteOrderDetails(Integer id);
}

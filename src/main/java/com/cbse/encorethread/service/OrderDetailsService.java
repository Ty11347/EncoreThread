package com.cbse.encorethread.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cbse.encorethread.dto.OrderDetailsDTO;
import com.cbse.encorethread.model.OrderDetails;

@Service
public interface OrderDetailsService {
  public OrderDetails getOrderDetailById(Integer id);

  public List<OrderDetailsDTO> getOrderDetailsByOrderId(Integer orderId);

  public OrderDetails createOrderDetails(OrderDetails orderDetails);

  public void deleteOrderDetails(Integer id);
}

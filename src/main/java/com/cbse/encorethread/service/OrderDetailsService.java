package com.cbse.encorethread.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbse.encorethread.dto.OrderDetailsDTO;
import com.cbse.encorethread.model.OrderDetails;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.OrderDetailsRepository;
import com.cbse.encorethread.repository.ProductsRepository;

@Service
public class OrderDetailsService {
  private OrderDetailsRepository orderDetailsRepository;

  @Autowired
  private ProductsRepository productsRepository;

  public OrderDetailsService(OrderDetailsRepository orderDetailsRepository) {
    this.orderDetailsRepository = orderDetailsRepository;
  }

  private OrderDetailsDTO orderDetailsDTOMapper(OrderDetails orderDetails) {
    Products product = productsRepository.getById(orderDetails.getProductId());

    return new OrderDetailsDTO(
      product.getId(),
      orderDetails.getQuantity(),
      orderDetails.getPrice(),
      product.getName(),
      product.getImageUrl(),
      product.getDescription()
    );
  }

  public OrderDetails getOrderDetailById(Integer id) {
    return orderDetailsRepository.findById(id).orElseThrow(() -> new RuntimeException("OrderDetails not found with id: " + id));
  }

  public List<OrderDetailsDTO> getOrderDetailsByOrderId(Integer orderId) {
    return orderDetailsRepository.findAllByOrderId(orderId)
        .stream()
        .map(orderDetails -> orderDetailsDTOMapper(orderDetails))
        .collect(Collectors.toList());
  }

  public OrderDetails createOrderDetails(OrderDetails orderDetails) {
    Optional<Integer> temp = orderDetailsRepository.findLatestId();
    Integer orderDetailId;
    if (temp.isEmpty()) {
      orderDetailId = 0;
    } else {
      orderDetailId = temp.get();
    }
    orderDetails.setId(++orderDetailId);
    return orderDetailsRepository.save(orderDetails);
  }

  public void deleteOrderDetails(Integer id) {
    orderDetailsRepository.deleteById(id);
  }
}

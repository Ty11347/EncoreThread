package com.cbse.encorethread.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbse.encorethread.dto.OrderDetailsDTO;
import com.cbse.encorethread.model.OrderDetails;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.OrderDetailsRepository;

@Service
public class OrderDetailsService {
  private OrderDetailsRepository orderDetailsRepository;

  @Autowired
  private ProductsService productsService;

  public OrderDetailsService(OrderDetailsRepository orderDetailsRepository) {
    this.orderDetailsRepository = orderDetailsRepository;
  }

  private OrderDetailsDTO orderDetailsDTOMapper(OrderDetails orderDetails) {
    Products product = productsService.getProductById(orderDetails.getId());

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
    return orderDetailsRepository.findById(id).orElseThrow();
  }

  public List<OrderDetailsDTO> getOrderDetailsByOrderId(Integer orderId) {
    return orderDetailsRepository.findAllByOrderId(orderId)
        .stream()
        .map(orderDetails -> orderDetailsDTOMapper(orderDetails))
        .collect(Collectors.toList());
  }

  public OrderDetails createOrderDetails(OrderDetails orderDetails) {
    return orderDetailsRepository.save(orderDetails);
  }

  public void deleteOrderDetails(Integer id) {
    orderDetailsRepository.deleteById(id);
  }
}

package com.cbse.encorethread.dto;

import java.time.LocalDate;

public class OrdersDTO {
  private Integer userId;
  private String orderStatus;
  private Double totalPrice;
  private String address;
  private LocalDate orderDate;
  private Integer[] productIds;
  private Integer[] quantities;
  private Double[] prices;

  public OrdersDTO(Integer userId, String orderStatus, String address, LocalDate orderDate, Integer[] productIds, Integer[] quantities, Double[] prices) {
    this.userId = userId;
    this.orderStatus = orderStatus;
    this.totalPrice = 0.0;
    this.address = address;
    this.orderDate = orderDate;
    this.productIds = productIds;
    this.quantities = quantities;
    this.prices = prices;
    
    for (int i = 0; i < prices.length; i++) {
      this.totalPrice += prices[i] * quantities[i];
    }
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getOrderStatus() {
    return orderStatus;
  }

  public void setOrderStatus(String orderStatus) {
    this.orderStatus = orderStatus;
  }

  public Double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(Double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public LocalDate getOrderDate() {
    return orderDate;
  }

  public void setOrderDate(LocalDate orderDate) {
    this.orderDate = orderDate;
  }

  public Integer[] getProductIds() {
    return productIds;
  }

  public void setProductIds(Integer[] productIds) {
    this.productIds = productIds;
  }

  public Integer[] getQuantities() {
    return quantities;
  }

  public void setQuantities(Integer[] quantities) {
    this.quantities = quantities;
  }

  public Double[] getPrices() {
    return prices;
  }

  public void setPrices(Double[] prices) {
    this.prices = prices;
  }
}

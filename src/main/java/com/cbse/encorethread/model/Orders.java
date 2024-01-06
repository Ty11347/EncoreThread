package com.cbse.encorethread.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {
  @Id
  @Column(name = "order_id", nullable = false)
  private Integer id;

  @Column(name = "user_id", nullable = false)
  private Integer userId;

  @Column(name = "order_status", nullable = false)
  private String orderStatus;

  @Column(name = "total_price", nullable = false)
  private Double totalPrice;

  @Column(name = "address", nullable = false)
  private String address;

  @Column(name = "order_date", nullable = false)
  private LocalDate orderDate;

  public Orders() {
  }

  public Orders(Integer id, Integer userId, String orderStatus, Double totalPrice, String address, LocalDate orderDate) {
    this.id = id;
    this.userId = userId;
    this.orderStatus = orderStatus;
    this.totalPrice = totalPrice;
    this.address = address;
    this.orderDate = orderDate;
  }

  public Orders(Integer userId, String orderStatus, Double totalPrice, String address, LocalDate orderDate) {
    this.userId = userId;
    this.orderStatus = orderStatus;
    this.totalPrice = totalPrice;
    this.address = address;
    this.orderDate = orderDate;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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
}

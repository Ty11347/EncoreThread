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
  @Column(name = "order_id")
  private Integer id;

  @Column(name = "user_id")
  private Long user_id;

  @Column(name = "order_status")
  private String order_status;

  @Column(name = "total_price")
  private Double total_price;

  @Column(name = "order_date")
  private LocalDate order_date;

  @Column(name = "address")
  private String address;

  public Orders() {
  }

  public Orders(Integer id, Long user_id, String order_status, Double total_price, LocalDate order_date) {
    this.id = id;
    this.user_id = user_id;
    this.order_status = order_status;
    this.total_price = total_price;
    this.order_date = order_date;
  }

  public Orders(Long user_id, String order_status, Double total_price, LocalDate order_date) {
    this.user_id = user_id;
    this.order_status = order_status;
    this.total_price = total_price;
    this.order_date = order_date;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Long getUserId() {
    return user_id;
  }

  public void setUserId(Long user_id) {
    this.user_id = user_id;
  }

  public String getOrderStatus() {
    return order_status;
  }

  public void setOrderStatus(String order_status) {
    this.order_status = order_status;
  }

  public Double getTotalPrice() {
    return total_price;
  }

  public void setTotalPrice(Double total_price) {
    this.total_price = total_price;
  }

  public LocalDate getOrderDate() {
    return order_date;
  }

  public void setOrderDate(LocalDate order_date) {
    this.order_date = order_date;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }
}

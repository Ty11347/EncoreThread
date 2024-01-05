package com.cbse.encorethread.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orderdetails")
public class OrderDetails {
  @Id
  @Column(name = "order_detail_id", nullable = false)
  private Integer id;

  @Column(name = "order_id", nullable = false)
  private Integer orderId;

  @Column(name = "product_id", nullable = false)
  private Integer productId;

  @Column(name = "quantity", nullable = false)
  private Integer quantity;

  // single product price
  @Column(name = "price", nullable = false)
  private Double price;

  public OrderDetails() {
  }

  public OrderDetails(Integer id, Integer orderId, Integer productId, Integer quantity, Double price) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }

  public OrderDetails(Integer orderId, Integer productId, Integer quantity, Double price) {
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getOrderId() {
    return orderId;
  }

  public void setOrderId(Integer orderId) {
    this.orderId = orderId;
  }

  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Double getPrice() {
    return price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  // public String getSize() {
  //   return size;
  // }

  // public void setSize(String size) {
  //   this.size = size;
  // }
}
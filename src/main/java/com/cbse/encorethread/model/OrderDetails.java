package com.cbse.encorethread.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class OrderDetails {
  @Id
  @Column(name = "order_detail_id")
  private Integer id;

  @Column(name = "order_id")
  private Integer order_id;

  @Column(name = "product_id")
  private Integer product_id;

  @Column(name = "quantity")
  private Integer quantity;

  // single product price
  @Column(name = "price")
  private Double price;

  // @Column(name = "size")
  // private String size;

  public OrderDetails() {
  }

  public OrderDetails(Integer id, Integer order_id, Integer product_id, Integer quantity, Double price) {
    this.id = id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.price = price;
  }

  public OrderDetails(Integer order_id, Integer product_id, Integer quantity, Double price) {
    this.order_id = order_id;
    this.product_id = product_id;
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
    return order_id;
  }

  public void setOrderId(Integer order_id) {
    this.order_id = order_id;
  }

  public Integer getProductId() {
    return product_id;
  }

  public void setProductId(Integer product_id) {
    this.product_id = product_id;
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

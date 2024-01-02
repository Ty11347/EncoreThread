package com.cbse.encorethread.dto;

public class OrderDetailsDTO {
    private Integer productId;
    private Integer quantity;
    private Double price;
    private String productName;
    private String productImageURL;
    private String productDescription;

    public OrderDetailsDTO(Integer productId, Integer quantity, Double price, String productName, String productImageURL, String productDescription) {
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.productName = productName;
        this.productImageURL = productImageURL;
        this.productDescription = productDescription;
    }

    public Integer getProductId(){
      return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Double getPrice() {
        return price;
    }

    public String getProductName() {
        return productName;
    }

    public String getProductImageURL() {
        return productImageURL;
    }

    public String getProductDescription() {
        return productDescription;
    }
}



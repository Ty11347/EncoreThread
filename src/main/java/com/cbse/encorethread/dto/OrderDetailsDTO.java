package com.cbse.encorethread.dto;

public record OrderDetailsDTO(
  Integer quantity,
  Double price,
  String productName,
  String productImageURL,
  String productDescription
) {
  
}

package com.cbse.encorethread.service;

import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.ProductsRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final ProductsRepository productsRepository;

    public AdminService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public Products addProduct(Products product) {
        return productsRepository.save(product);
    }

    public Products updateProduct(Integer id, Products product) {
        product.setId(id);
        return productsRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productsRepository.deleteById(id);
    }

    public int updateProductQuantity(Integer id, Integer quantityChange) throws Exception {
        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        int newQuantity = product.getQuantity() + quantityChange;
        if (newQuantity < 0) {
            throw new IllegalStateException("Insufficient stock");
        }
        product.setQuantity(newQuantity);
        productsRepository.save(product);
        return newQuantity;
    }
}

package com.cbse.encorethread.impl;

import org.springframework.stereotype.Service;

import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.ProductsRepository;
import com.cbse.encorethread.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    private final ProductsRepository productsRepository;

    public AdminServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public Products addProduct(Products product) {
        return productsRepository.save(product);
    }

    @Override
    public Products updateProduct(Integer id, Products product) {
        product.setId(id);
        return productsRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer id) {
        productsRepository.deleteById(id);
    }

    @Override
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

package com.cbse.encorethread.impl;

import org.springframework.stereotype.Service;

import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.ProductsRepository;
import com.cbse.encorethread.service.AdminService;
import org.springframework.transaction.annotation.Transactional;


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
    @Transactional
    public int updateProductQuantity(Integer id, Integer quantityChange) throws Exception {
        // Check if product exists
        if (!productsRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }

        int rowsAffected = productsRepository.updateProductQuantityWithSql(id, quantityChange);
        if (rowsAffected == 0) {
            throw new IllegalStateException("Update failed, product not found or other issue");
        }

        Products product = productsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error retrieving updated product"));
        return product.getQuantity();
    }
}

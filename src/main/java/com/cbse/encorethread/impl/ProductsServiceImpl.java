package com.cbse.encorethread.impl;

import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.ProductsRepository;
import com.cbse.encorethread.service.ProductsService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsServiceImpl implements ProductsService {

    private final ProductsRepository productRepository;

    public ProductsServiceImpl(ProductsRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }
}

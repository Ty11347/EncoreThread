package com.cbse.encorethread.service;

import com.cbse.encorethread.model.Products;

public interface AdminService {

    Products addProduct(Products product);

    Products updateProduct(Integer id, Products product);

    void deleteProduct(Integer id);

    int updateProductQuantity(Integer id, Integer quantityChange) throws Exception;
}

package com.cbse.encorethread.controller;

import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.service.ProductsService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductsService productsService;

    public ProductController(ProductsService productsService) {
        this.productsService = productsService;
    }

 @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        try {
            List<Products> products = productsService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            // Handle specific exceptions or provide a generic message
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

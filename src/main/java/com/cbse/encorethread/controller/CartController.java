package com.cbse.encorethread.controller;

import com.cbse.encorethread.service.CartsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/carts")
public class CartController {
    private final CartsService cartsService;

    public CartController(CartsService cartsService) {
        this.cartsService = cartsService;
    }
}

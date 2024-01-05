package com.cbse.encorethread.controller;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.model.Carts;
import com.cbse.encorethread.service.CartItemsService;
import com.cbse.encorethread.service.CartsService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/carts")
public class CartController {
    @Autowired
    CartsService cartsService;
    @Autowired
    CartItemsService cartItemsService;

    @PostMapping("/add")
    public ResponseEntity<?> createCart(@RequestBody Carts cart) {
        try {
            Carts createdCart = cartsService.createCart(cart);
            return new ResponseEntity<>(createdCart, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping("/user/{id}") // DONE CHECK
    public ResponseEntity<List<CartItems>> getCartByUserId(@PathVariable(value = "id") Integer userId) {
        try {
            Carts cart = cartsService.getCartByUserId(userId);
            List<CartItems> items = cartItemsService.getAllCartItemsByCartId(cart.getCartId());
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PostMapping("/item/add") // DONE CHECK
    public ResponseEntity<CartItems> createCartItems(@RequestBody CartItems item) {
        try {
            cartsService.createCartItems(item);
            CartItems createdItem = cartItemsService.createCartItems(item);
            return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/item/delete") // DONE CHECK
    public ResponseEntity<?> deleteCartItems(
            @RequestBody CartItems item) {
        try {
            cartItemsService.deleteCartItems(item.getCartId(), item.getProductId());
            return new ResponseEntity<>("Cart item successfully deleted!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @DeleteMapping("/delete/{id}") // DONE CHECK
    public ResponseEntity<?> deleteCart(@PathVariable(value = "id") Integer cartId) {
        try {
            cartsService.emptyCart(cartId);
            cartItemsService.deleteCartItemsByCartId(cartId);
            return new ResponseEntity<>("Cart successfully deleted!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @PutMapping("/item/update") // DONE CHECK
    public ResponseEntity<?> updateCartItems(@RequestBody CartItems item) {
        try {
            CartItems createdItem = cartItemsService.updateCartItems(item);
            return new ResponseEntity<>(createdItem, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

}

package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.repository.CartItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemsServiceImpl implements CartItemsService {

    private final CartItemsRepository cartItemsRepository;

    @Autowired
    public CartItemsServiceImpl(CartItemsRepository cartItemsRepository) {
        this.cartItemsRepository = cartItemsRepository;
    }

    @Override
    public List<CartItems> getAllCartItems() {
        return cartItemsRepository.findAll();
    }

    @Override
    public CartItems getCartItemsById(Integer cartId, Integer productId) {
        return null;
    }

    @Override
    public CartItems createCartItems(CartItems cartItems) {
        return cartItemsRepository.save(cartItems);
    }

    @Override
    public CartItems updateCartItems(Integer cartId, Integer productId, CartItems updatedCartItems) {
        return null;
    }

    @Override
    public void deleteCartItems(Integer cartId, Integer productId) {
    }
}


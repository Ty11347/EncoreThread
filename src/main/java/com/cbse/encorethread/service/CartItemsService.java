package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;

import java.util.List;

public interface CartItemsService {

    List<CartItems> getAllCartItems();

    CartItems getCartItemsById(Integer cartId, Integer productId);

    CartItems createCartItems(CartItems cartItems);

    CartItems updateCartItems(Integer cartId, Integer productId, CartItems updatedCartItems);

    void deleteCartItems(Integer cartId, Integer productId);
}

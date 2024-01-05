package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;

import java.util.List;

public interface CartItemsService {

    List<CartItems> getAllCartItems();

    List<CartItems> getAllCartItemsByCartId(Integer cartId);

    CartItems createCartItems(CartItems cartItems);

    CartItems updateCartItems(CartItems updatedCartItems);

    void deleteCartItems(Integer cartId, Integer productId);

    void deleteCartItemsByCartId(Integer cartId);
}

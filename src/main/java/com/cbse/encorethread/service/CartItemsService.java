package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;

import java.util.List;

public interface CartItemsService {

    List<CartItems> getAllCartItems();

    List<CartItems> getAllCartItemsByCartId(Integer cartId);

    CartItems createCartItems(CartItems cartItems);

    CartItems updateCartItems(CartItems updatedCartItems);

    void deleteCartItems(Integer cartItemId);

    void deleteCartItemsByCartId(Integer cartId);
}

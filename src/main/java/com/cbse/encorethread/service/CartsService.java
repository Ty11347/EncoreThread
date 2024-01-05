package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.model.Carts;

public interface CartsService {
    Carts getCartByUserId(Integer userId);

    void emptyCart(Integer cartId);

    // Integrate with CartItemsService
    void createCartItems(CartItems item);
}


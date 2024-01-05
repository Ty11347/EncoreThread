package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.model.Carts;

import java.util.List;

public interface CartsService {
    List<Carts> getAllCarts();

    Carts getCartById(Integer cartId);

    Carts getCartByUserId(Integer userId);

    Carts createCart(Carts cart);

    Carts updateCart(Integer cartId, Carts updatedCart);

    void deleteCart(Integer cartId);

    void emptyCart(Integer cartId);

    // Integrate with CartItemsService
    void createCartItems(CartItems item);
}


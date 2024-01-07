package com.cbse.encorethread.impl;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.model.Carts;
import com.cbse.encorethread.repository.CartsRepository;
import com.cbse.encorethread.repository.ProductsRepository;
import com.cbse.encorethread.service.CartItemsService;
import com.cbse.encorethread.service.CartsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartsServiceImpl implements CartsService {

    @Autowired
    CartsRepository cartsRepository;
    @Autowired
    ProductsRepository productsRepository;

    @Autowired
    CartItemsService cartItemsService;

    @Override
    public Carts getCartByUserId(Integer userId) {
        Optional<Carts> findCart = cartsRepository.findByUserId(userId);

        if (findCart.isPresent()) {
            return findCart.get();
        } else {
            Carts cart = new Carts(userId);
            cart.setStatus("empty");
            return cartsRepository.save(cart);
        }
    }

    @Override
    public void emptyCart(Integer cartId) {
        Optional<Carts> cart = cartsRepository.findByCartId(cartId);
        if (cart.isPresent()) {
            cart.get().setStatus("empty");
            cartsRepository.save(cart.get());
        } else {
            throw new IllegalArgumentException("Cart not found with cartId: " + cartId);
        }
    }

    @Override
    public void createCartItems(CartItems item) {
        Optional<Carts> cart = cartsRepository.findByCartId(item.getCartId());
        if (cart.isPresent()) {
            cart.get().setStatus("pending");
            cartsRepository.save(cart.get());
        } else {
            throw new IllegalArgumentException("Cart not found with cartId: " + item.getCartId());
        }
    }
}

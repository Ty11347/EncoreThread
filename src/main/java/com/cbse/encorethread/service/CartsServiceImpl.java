package com.cbse.encorethread.service;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.model.Carts;
import com.cbse.encorethread.repository.CartsRepository;
import com.cbse.encorethread.repository.ProductsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<Carts> getAllCarts() {
        return cartsRepository.findAll();
    }

    @Override
    public Carts getCartById(Integer cartId) {
        Optional<Carts> optionalCart = cartsRepository.findById(cartId);
        return optionalCart.orElse(null);
    }

    @Override
    public Carts createCart(Carts cart) {
        cart.setStatus("empty");
        return cartsRepository.save(cart);
    }

    @Override
    public Carts updateCart(Integer cartId, Carts updatedCart) {
        if (cartsRepository.existsById(cartId)) {
            updatedCart.setCartId(cartId);
            return cartsRepository.save(updatedCart);
        }
        return null;
    }

    @Override
    public void deleteCart(Integer cartId) {
        cartsRepository.deleteById(cartId);
    }

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
    public void createCartItems(CartItems item) {
        Optional<Carts> cart = cartsRepository.findByCartId(item.getCartId());
        if (cart.isPresent()) {
            cart.get().setStatus("pending");
            cartsRepository.save(cart.get());
        } else {
            throw new IllegalArgumentException("Cart not found with cartId: " + item.getCartId());
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
}

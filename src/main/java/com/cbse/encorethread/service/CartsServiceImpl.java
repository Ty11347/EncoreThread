package com.cbse.encorethread.service;

import com.cbse.encorethread.model.Carts;
import com.cbse.encorethread.repository.CartsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartsServiceImpl implements CartsService {

    private final CartsRepository cartsRepository;

    @Autowired
    public CartsServiceImpl(CartsRepository cartsRepository) {
        this.cartsRepository = cartsRepository;
    }

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
}


package com.cbse.encorethread.impl;

import com.cbse.encorethread.model.CartItems;
import com.cbse.encorethread.model.Carts;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.repository.CartItemsRepository;
import com.cbse.encorethread.repository.CartsRepository;
import com.cbse.encorethread.repository.ProductsRepository;
import com.cbse.encorethread.service.CartItemsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemsServiceImpl implements CartItemsService {

    // Dependency Injection
    @Autowired
    CartItemsRepository cartItemsRepository;
    @Autowired
    CartsRepository cartsRepository;
    @Autowired
    ProductsRepository productsRepository;

    @Override
    public List<CartItems> getAllCartItems() {
        return cartItemsRepository.findAll();
    }

    @Override
    public CartItems createCartItems(CartItems cartItems) {
        CartItems oldCartItems = cartItemsRepository.findByCartIdAndProductId(cartItems.getCartId(),
                cartItems.getProductId());
        System.out.println(oldCartItems);
        if (oldCartItems != null) {
            oldCartItems.setQuantity(oldCartItems.getQuantity() + cartItems.getQuantity());
            return cartItemsRepository.save(oldCartItems);
        } else {
            Products product = productsRepository.findById(cartItems.getProductId()).orElse(null);
            CartItems createdCartItems = new CartItems(cartItems.getCartId(), product.getId(), cartItems.getQuantity(),
                    product.getPrice(),
                    Timestamp.from(Instant.now()));
            return cartItemsRepository.save(createdCartItems);
        }
    }

    @Override
    public CartItems updateCartItems(CartItems updatedCartItems) {
        Optional<CartItems> findItem = cartItemsRepository.findById(updatedCartItems.getCartItemId());

        if (findItem.isPresent()) {
            CartItems existingItem = findItem.get();
            if (updatedCartItems.getQuantity() == 0) {
                cartItemsRepository.delete(existingItem);

                // if cart items list empty
                // set cart status = empty
                if (getAllCartItems().size() == 0) {
                    Optional<Carts> cart = cartsRepository.findByCartId(existingItem.getCartId());
                    cart.get().setStatus("empty");
                    cartsRepository.save(cart.get());
                }
                return updatedCartItems;
            }
            existingItem.setAddedAt(
                    updatedCartItems.getAddedAt() != null ? updatedCartItems.getAddedAt()
                            : Timestamp.from(Instant.now()));
            existingItem.setQuantity(updatedCartItems.getQuantity());

            return cartItemsRepository.save(existingItem);
        } else {
            throw new IllegalArgumentException("Cart item not found with id: " + updatedCartItems.getCartItemId());
        }
    }

    @Override
    @Transactional
    public void deleteCartItems(Integer cartItemId) {
        cartItemsRepository.deleteByCartItemId(cartItemId);
    }

    @Override
    public List<CartItems> getAllCartItemsByCartId(Integer cartId) {
        return cartItemsRepository.findByCartId(cartId);
    }

    @Override
    @Transactional
    public void deleteCartItemsByCartId(Integer cartId) {
        cartItemsRepository.deleteByCartId(cartId);
    }
}

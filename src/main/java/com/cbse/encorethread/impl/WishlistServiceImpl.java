package com.cbse.encorethread.impl;

import com.cbse.encorethread.dto.WishlistAddDTO;
import com.cbse.encorethread.model.Orders;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.model.Reviews;
import com.cbse.encorethread.model.Wishlist;
import com.cbse.encorethread.repository.WishlistRepository;
import com.cbse.encorethread.service.WishlistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistServiceImpl implements WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public List<Products> getProductsByUserId(Integer userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }

        return wishlistRepository.findProductsByUserId(userId);
    }

    @Override
    public Wishlist addToWishlist(WishlistAddDTO wishlistDTO) {
        if (wishlistDTO.getUserId() == null || wishlistDTO.getProductId() == null) {
            throw new IllegalArgumentException("User ID and Product ID must not be null");
        }

        Optional<Wishlist> existingWishlist = wishlistRepository.findByUserIdAndProductId(wishlistDTO.getUserId(),
                wishlistDTO.getProductId());

        if (existingWishlist.isPresent()) {
            throw new IllegalStateException("Wishlist entry already exists");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUserId(wishlistDTO.getUserId());
        wishlist.setProductId(wishlistDTO.getProductId());
        return wishlistRepository.save(wishlist);
    }

    @Override
    public void removeFromWishlist(Integer userId, Integer productId) {
        if (userId == null || productId == null) {
            throw new IllegalArgumentException("User ID and Product ID must not be null");
        }

        Wishlist wishlist = wishlistRepository.findByUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));
        wishlistRepository.delete(wishlist);
    }

    @Override
    public boolean isProductInWishlist(Integer userId, Integer productId) {
        if (userId == null || productId == null) {
            throw new IllegalArgumentException("User ID and Product ID must not be null");
        }

        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }

    @Override
    public void removeAllFromWishlist(Integer userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }

        wishlistRepository.deleteByUserId(userId);
    }
}

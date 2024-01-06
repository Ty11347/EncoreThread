package com.cbse.encorethread.service;

import java.util.List;

import com.cbse.encorethread.dto.WishlistAddDTO;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.model.Wishlist;

public interface WishlistService {
    public List<Products> getProductsByUserId(Integer userId);

    public Wishlist addToWishlist(WishlistAddDTO wishlistDTO);

    public void removeFromWishlist(Integer userId, Integer productId);

    public boolean isProductInWishlist(Integer userId, Integer productId);

    public void removeAllFromWishlist(Integer userId);
}

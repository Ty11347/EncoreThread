package com.cbse.encorethread.controller;

import com.cbse.encorethread.dto.WishlistAddDTO;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.model.Wishlist;
import com.cbse.encorethread.service.WishlistService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Products>> getProductsByUserId(@PathVariable Long userId) {
        List<Products> products = wishlistService.getProductsByUserId(userId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/check/{userId}/{productId}")
    public ResponseEntity<Boolean> isProductInWishlist(@PathVariable Long userId, @PathVariable Integer productId) {
        boolean isInWishlist = wishlistService.isProductInWishlist(userId, productId);
        return ResponseEntity.ok(isInWishlist);
    }

    @PostMapping("/add")
    public ResponseEntity<Wishlist> addProductToWishlist(@RequestBody WishlistAddDTO wishlistAddDTO) {
        Wishlist wishlist = wishlistService.addToWishlist(wishlistAddDTO);
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/remove/{userId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long userId, @RequestParam Integer productId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }
}

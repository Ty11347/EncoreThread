package com.cbse.encorethread.controller;

import com.cbse.encorethread.dto.WishlistAddDTO;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.model.Wishlist;
import com.cbse.encorethread.service.WishlistService;

import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> getProductsByUserId(@PathVariable Long userId) {
        try {
            List<Products> products = wishlistService.getProductsByUserId(userId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving wishlist products for user ID: " + userId);
        }
    }

    @GetMapping("/check/{userId}/{productId}")
    public ResponseEntity<?> isProductInWishlist(@PathVariable Long userId, @PathVariable Integer productId) {
        try {
            boolean isInWishlist = wishlistService.isProductInWishlist(userId, productId);
            return ResponseEntity.ok(isInWishlist);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error checking if product is in wishlist for user ID: " + userId);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProductToWishlist(@RequestBody WishlistAddDTO wishlistAddDTO) {
        try {
            Wishlist wishlist = wishlistService.addToWishlist(wishlistAddDTO);
            return ResponseEntity.ok(wishlist);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding product to wishlist");
        }
    }

    @DeleteMapping("/remove/{userId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long userId, @RequestParam Integer productId) {
        try {
            wishlistService.removeFromWishlist(userId, productId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error removing product from wishlist for user ID: " + userId);
        }
    }
}

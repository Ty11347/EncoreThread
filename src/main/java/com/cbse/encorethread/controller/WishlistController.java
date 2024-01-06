package com.cbse.encorethread.controller;

import com.cbse.encorethread.dto.WishlistAddDTO;
import com.cbse.encorethread.impl.WishlistServiceImpl;
import com.cbse.encorethread.model.Products;
import com.cbse.encorethread.model.Wishlist;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {
    private final WishlistServiceImpl wishlistService;

    public WishlistController(WishlistServiceImpl wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProductsByUserId(@PathVariable Integer userId) {
        try {
            List<Products> products = wishlistService.getProductsByUserId(userId);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving wishlist products for user ID: " + userId);
        }
    }

    @GetMapping("/check/{userId}/{productId}")
    public ResponseEntity<?> isProductInWishlist(@PathVariable Integer userId, @PathVariable Integer productId) {
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
    public ResponseEntity<?> removeFromWishlist(@PathVariable Integer userId, @RequestParam Integer productId) {
        try {
            wishlistService.removeFromWishlist(userId, productId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error removing product from wishlist for user ID: " + userId);
        }
    }

    // delete all wishlist from a specific user
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteAllWishlistItemsByUserId(@PathVariable Integer userId) {
        try {
            wishlistService.removeAllFromWishlist(userId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            // This block catches any IllegalArgumentExceptions thrown by the service
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // This block catches any other exceptions
            e.printStackTrace(); // Log the exception stack trace for debugging purposes
            return ResponseEntity.internalServerError().body("An error occurred while processing your request.");
        }
    }
}

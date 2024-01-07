package com.cbse.encorethread.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cbse.encorethread.model.Reviews;
import com.cbse.encorethread.service.ReviewsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {

    private final ReviewsService reviewsService;

    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody Reviews reviews) {
        boolean added = reviewsService.addReview(reviews);
        if (added) {
            return ResponseEntity.ok("Review added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Review not added");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteReview(@RequestParam(name = "id") Long id) {
        boolean deleted = reviewsService.deleteReview(id);
        if (deleted) {
            return ResponseEntity.ok("Review deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateReview(@RequestParam(name = "id") Long id, @RequestBody Reviews updatedReview) {
        Reviews existingReview = reviewsService.findReviewById(id);

        if (existingReview != null) {
            existingReview.setProductId(updatedReview.getProductId());
            existingReview.setUserId(updatedReview.getUserId());
            existingReview.setRating(updatedReview.getRating());
            existingReview.setComment(updatedReview.getComment());
            existingReview.setCommentDate(updatedReview.getCommentDate());
            existingReview.setImageData(updatedReview.getImageData());
            reviewsService.updateReview(existingReview);

            return ResponseEntity.ok("Review updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Reviews> getReviewById(@RequestParam(name = "id") Long id) {
        Reviews existingReview = reviewsService.findReviewById(id);
        if (existingReview != null) {
            return ResponseEntity.ok(existingReview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/product")
    public ResponseEntity<List<Reviews>> getReviewByProductId(@RequestParam(name = "productId") int productId) {
        List<Reviews> reviewsList = reviewsService.fetchReviewsByProductId(productId);

        if (reviewsList != null) {
            return ResponseEntity.ok(reviewsList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/user")
    public ResponseEntity<List<Reviews>> getReviewByUserId(@RequestParam(name = "userId") int userId) {
        List<Reviews> reviewsList = reviewsService.fetchReviewsByUserId(userId);

        if (reviewsList != null) {
            return ResponseEntity.ok(reviewsList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get/user/product")
    public ResponseEntity<Reviews> getReviewByUserIdAndProductId(@RequestParam(name = "userId") int userId, @RequestParam(name = "productId") int productId) {
        Reviews review = reviewsService.fetchReviewByUserIdAndProductId(userId, productId);

        if (review != null) {
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/delete/all")
    public void deleteReviewsByUserId(@RequestParam(name="userId") int userId){
        reviewsService.deleteAllReviewsByUserId(userId);
    }

}
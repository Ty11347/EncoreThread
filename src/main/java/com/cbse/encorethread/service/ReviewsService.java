package com.cbse.encorethread.service;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.cbse.encorethread.model.Reviews;
import com.cbse.encorethread.repository.ReviewsRepository;

@Service
public class ReviewsService {

    private final ReviewsRepository reviewsRepository;

    public ReviewsService(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    public boolean addReview(Reviews review) {
        try {
            Long latestId = reviewsRepository.findLatestId();
            review.setId(latestId + 1);
            reviewsRepository.save(review);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    public boolean deleteReview(Long id) {
        try {
            reviewsRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }
    
    public boolean updateReview(Reviews review) {
        try {
            reviewsRepository.save(review);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    public Reviews findReviewById(Long id) {
        return reviewsRepository.findById(id).orElse(null);
    }

    public List<Reviews> fetchReviewsByProductId(int productId) {
        return reviewsRepository.findByProductId(productId);
    }

    public List<Reviews> fetchReviewsByUserId(int userId) {
        return reviewsRepository.findByUserId(userId);
    }

    public Reviews fetchReviewByUserIdAndProductId(int userId, int productId) {
        return reviewsRepository.findByUserIdAndProductId(userId, productId);
    }

}
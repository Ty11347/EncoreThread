package com.cbse.encorethread.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.cbse.encorethread.model.Reviews;
import com.cbse.encorethread.repository.ReviewsRepository;
import com.cbse.encorethread.service.ReviewsService;

@Service
public class ReviewsServiceImpl implements ReviewsService{

    @Autowired
    ReviewsRepository reviewsRepository;

    @Override
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

    @Override
    public boolean deleteReview(Long id) {
        try {
            reviewsRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    @Override
    public boolean updateReview(Reviews review) {
        try {
            reviewsRepository.save(review);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }

    @Override
    public Reviews findReviewById(Long id) {
        return reviewsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Reviews> fetchReviewsByProductId(int productId) {
        return reviewsRepository.findByProductId(productId);
    }

    @Override
    public List<Reviews> fetchReviewsByUserId(int userId) {
        return reviewsRepository.findByUserId(userId);
    }

    @Override
    public Reviews fetchReviewByUserIdAndProductId(int userId, int productId) {
        return reviewsRepository.findByUserIdAndProductId(userId, productId);
    }

    @Override
    public void deleteAllReviewsByUserId(int userId) {

            List<Reviews> reviewsList = reviewsRepository.findByUserId(userId);
            for (Reviews review : reviewsList) {
                reviewsRepository.deleteById(review.getId());
            }

    }

}

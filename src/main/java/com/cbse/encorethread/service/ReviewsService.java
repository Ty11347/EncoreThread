package com.cbse.encorethread.service;

import com.cbse.encorethread.model.Reviews;

import java.util.List;



public interface ReviewsService {

    boolean addReview(Reviews review);

    boolean deleteReview(Long id); 

    boolean updateReview(Reviews review);

    Reviews findReviewById(Long id); 

    List<Reviews> fetchReviewsByProductId(int productId);

    List<Reviews> fetchReviewsByUserId(int userId) ;

    Reviews fetchReviewByUserIdAndProductId(int userId, int productId) ;

    boolean deleteAllReviewsByUserId(int userId);

}

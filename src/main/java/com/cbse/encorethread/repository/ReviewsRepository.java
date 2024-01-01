package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Reviews;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewsRepository extends JpaRepository<Reviews, Long>{
    
    @Query("SELECT r FROM Reviews r WHERE r.productId = :productId")
    public List<Reviews> findByProductId(@Param("productId") int productId);

    @Query("SELECT r FROM Reviews r WHERE r.userId = :userId")
    public List<Reviews> findByUserId(@Param("userId") int userId);

    @Query("SELECT r FROM Reviews r WHERE r.userId = :userId AND r.productId = :productId")
    public Reviews findByUserIdAndProductId(@Param("userId")int userId, @Param("productId") int productId);

    @Query("SELECT MAX(r.id) FROM Reviews r")
    public Long findLatestId();
}
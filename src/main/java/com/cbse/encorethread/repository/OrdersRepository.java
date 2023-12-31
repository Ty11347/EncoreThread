package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {

  @Query(value = "SELECT * FROM orders WHERE user_id = ?1", nativeQuery = true)
  List<Orders> findByUserId(Long userId);
  
  @Query(value = "SELECT MAX(order_id) FROM orders", nativeQuery = true)
  Integer findLatestId();
}
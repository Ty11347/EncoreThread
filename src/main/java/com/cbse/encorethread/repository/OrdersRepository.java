package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Orders;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {

  @Query(value = "SELECT * FROM orders WHERE user_id = :userId", nativeQuery = true)
  List<Orders> findByUserId(@Param("userId") Long userId);
  
  @Query(value = "SELECT MAX(order_id) FROM orders", nativeQuery = true)
  Optional<Integer> findLatestId();

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM orders o WHERE o.user_id = :userId", nativeQuery = true)
  void deleteByUserId(@Param("userId") Long userId);
}
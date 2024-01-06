package com.cbse.encorethread.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cbse.encorethread.model.OrderDetails;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

  @Query(value = "SELECT * FROM orderdetails WHERE order_id = :orderId", nativeQuery = true)
  List<OrderDetails> findAllByOrderId(@Param("orderId") Integer orderId);

  @Query(value = "SELECT MAX(order_detail_id) FROM orderdetails", nativeQuery = true)
  Optional<Integer> findLatestId();

  @Transactional
  @Modifying
  @Query(value = "DELETE FROM orderdetails od WHERE od.order_id = :orderId", nativeQuery = true)
  void deleteByOrderId(@Param("orderId") Integer orderId);
}

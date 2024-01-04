package com.cbse.encorethread.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cbse.encorethread.model.OrderDetails;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

  @Query(value = "SELECT * FROM orderdetails WHERE order_id = ?1", nativeQuery = true)
  List<OrderDetails> findAllByOrderId(Integer orderId);

  @Query(value = "SELECT MAX(order_detail_id) FROM orderdetails", nativeQuery = true)
  Integer findLatestId();
  
}

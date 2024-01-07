package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Carts;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartsRepository extends JpaRepository<Carts, Integer> {
    Optional<Carts> findByUserId(Integer userId);

    Optional<Carts> findByCartId(Integer cartId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM carts WHERE user_id = ?1", nativeQuery = true)
    void deleteCartByUserId(Integer userId);
}

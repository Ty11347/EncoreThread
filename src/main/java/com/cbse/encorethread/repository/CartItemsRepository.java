package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.CartItems;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems, Integer> {
    CartItems findByCartIdAndProductId(Integer cartId, Integer productId);    

    List<CartItems> findByCartId(Integer cartId);

    Optional<CartItems> findById(Integer cartItemId);

    @Modifying
    @Query("DELETE FROM CartItems c WHERE c.cartId = :cartId AND c.productId = :productId")
    void deleteByCartIdAndProductId(Integer cartId, Integer productId);

    void deleteByCartItemId(Integer cartItemId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItems c WHERE c.cartId = :cartId")
    void deleteByCartId(Integer cartId);
}



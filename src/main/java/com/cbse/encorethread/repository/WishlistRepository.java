package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Wishlist;
import com.cbse.encorethread.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    @Query("SELECT p FROM Wishlist w JOIN Products p ON w.productId = p.id WHERE w.userId = :userId")
    List<Products> findProductsByUserId(@Param("userId") Integer userId);

    Optional<Wishlist> findByUserIdAndProductId(Integer userId, Integer productId);

    boolean existsByUserIdAndProductId(Integer userId, Integer productId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM wishlist WHERE user_id = :userId", nativeQuery = true)
    void deleteByUserId(@Param("userId") Integer userId);
}

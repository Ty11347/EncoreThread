package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Wishlist;
import com.cbse.encorethread.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    @Query("SELECT p FROM Wishlist w JOIN Products p ON w.productId = p.id WHERE w.userId = :userId")
    List<Products> findProductsByUserId(@Param("userId") Long userId);
    
    Optional<Wishlist> findByUserIdAndProductId(Long userId, Integer productId);
    boolean existsByUserIdAndProductId(Long userId, Integer productId);
}

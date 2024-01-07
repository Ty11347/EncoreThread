package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductsRepository extends JpaRepository<Products, Integer>{

    @Modifying
    @Query(value = "UPDATE products SET quantity = quantity + :quantityChange WHERE product_id = :id", nativeQuery = true)
    int updateProductQuantityWithSql(Integer id, Integer quantityChange);
}

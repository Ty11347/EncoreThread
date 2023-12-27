package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Integer>{
}

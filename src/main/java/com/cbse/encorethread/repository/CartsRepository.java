package com.cbse.encorethread.repository;

import com.cbse.encorethread.model.Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartsRepository extends JpaRepository<Carts, Integer> {
}

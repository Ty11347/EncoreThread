package com.cbse.encorethread.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cbse.encorethread.model.User;

import java.util.*;

import javax.transaction.Transactional;


@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findOneByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
    Optional<User> findById(@Param("userId")Integer userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM carts WHERE user_id = ?1", nativeQuery = true)
    void deleteCartByUserId(Integer userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM cartitems WHERE cart_id = ?1", nativeQuery = true)
    void deleteCartItemsByUserId(Integer cartId);
}

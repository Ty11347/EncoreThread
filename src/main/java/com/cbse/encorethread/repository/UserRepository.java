package com.cbse.encorethread.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.cbse.encorethread.model.User;

import java.util.*;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findOneByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
}

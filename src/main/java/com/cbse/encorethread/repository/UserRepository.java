package com.cbse.encorethread.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.cbse.encorethread.user.User;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Long>{
}
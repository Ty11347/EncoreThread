package com.cbse.encorethread.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Carts {
    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "created_at", nullable = false, insertable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at", nullable = false, insertable = false)
    private Timestamp updatedAt;

    @Column(name = "status", nullable = false)
    private String status;

    public Carts(Integer userId, Timestamp createdAt, Timestamp updatedAt, String status) {
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
    }

    public Carts(Integer userId) {
        this.userId = userId;
    }
}

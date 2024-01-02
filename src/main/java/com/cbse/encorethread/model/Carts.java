package com.cbse.encorethread.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Carts {
    @Id
    @Column(name = "cart_id")
    private Integer cartId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @Column(name = "status")
    private Character status;

    @OneToMany(mappedBy = "cart")
    private List<CartItems> cartItems;

    public Carts(Integer cartId, Integer userId, Timestamp createdAt, Timestamp updatedAt, Character status) {
        this.cartId = cartId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
    }

    public Carts(Integer userId, Timestamp createdAt, Timestamp updatedAt, Character status) {
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
    }
}

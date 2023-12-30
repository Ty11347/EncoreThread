package com.cbse.encorethread.model;

import java.util.Date;

import javax.persistence.*;


@Entity
@Table(name = "reviews")
public class Reviews {
    
    @Id
    @Column(name = "review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id")
    private int productId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "rating")
    private int rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "comment_date")
    private Date commentDate;

    @Column(name = "image_data")
    private String imageData;

    public Long getId() {
        return this.id;
    }

    public int getProductId() {
        return this.productId;
    }

    public int getUserId() {
        return this.userId;
    }

    public int getRating() {
        return this.rating;
    }

    public String getComment() {
        return this.comment;
    }

    public Date getCommentDate() {
        return this.commentDate;
    }

    public String getImageData() {
        return this.imageData;
    }
   
    public void setId(Long id) {
        this.id = id;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }
}

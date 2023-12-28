package com.cbse.encorethread.model;

import javax.persistence.*;

@Entity
@Table(name = "users")

public class User {
    @Id
    @Column(name="id", length=45)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="username", length = 255)
    private String username;

    @Column(name="email", length = 255)
    private String email;

    @Column(name="password", length = 255)
    private String password;

    @Column(name="roles", length = 255)
    private String roles;

    @Column(name="age", length = 45)
    private int age;

    @Column(name="contact", length = 255)
    private String contact;

    public User() {
    }

    public User(Long id, String username, String email, String password, String roles, int age, String contact){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.age = age;
        this.contact = contact;
    }

    public String getUsername() {
        return this.username;
    }

    public Long getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getContact() {
        return this.contact;
    }

    public String getRoles() {
        return this.roles;
    }

    public int getAge() {
        return this.age;
    }
}

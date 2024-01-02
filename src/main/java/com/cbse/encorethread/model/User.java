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

    @Column(name="age", length = 45)
    private int age;

    @Column(name="address", length = 255)
    private String address;

    @Column(name="contact", length = 255)
    private String contact;

    @Column(name="roles", length = 255)
    private String roles;

    @Column(name="password", length = 255)
    private String password;

    @Column(name = "profilepic")
    private String profilepic;

    public User() {
    }

    public User(Long id, String username, String email, int age, String address, String contact, String roles, String password, String profilepic){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.age = age;
        this.contact = contact;
        this.address = address;
        this.profilepic = profilepic;
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

    public String getAddress() {
        return this.address;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setContact(String contact) {
       this.contact = contact;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilepic() {
        return this.profilepic;
    }

    public void setProfilepic(String profilepic) {
        this.profilepic = profilepic;
    }
}

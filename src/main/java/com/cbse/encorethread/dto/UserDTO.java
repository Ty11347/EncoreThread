package com.cbse.encorethread.dto;

public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private int age;
    private String contact;
    private String roles;
    private String address;

    public UserDTO(Long userId, String username, String email, int age, String address, String contact, String roles){
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.age = age;
        this.address = address;
        this.contact = contact;
    }

    public UserDTO(){

    }

    public void setUsername(String username) {
       this.username = username;
    }

    public Long getUserById(Long userId) {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
    public String getUsername() {
        return this.username;
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
}
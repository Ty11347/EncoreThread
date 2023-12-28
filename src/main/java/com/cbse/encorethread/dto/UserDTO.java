package com.cbse.encorethread.dto;

public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String password;
    private int age;
    private String contact;
    private String roles;

    public UserDTO(Long userId, String username, String email, String password, String roles, int age, String contact){
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.age = age;
        this.contact = contact;
    }

    public UserDTO(){

    }

    public String getUsername() {
        return this.username;
    }

    public Long getUserId() {
        return this.userId;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public int getAge() {
        return this.age;
    }

    public String getContact() {
        return this.contact;
    }

    public String getRoles() {
        return this.roles;
    }
}

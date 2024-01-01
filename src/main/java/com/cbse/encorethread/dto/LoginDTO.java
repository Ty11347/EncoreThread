package com.cbse.encorethread.dto;

public class LoginDTO {
    private String username;
    private String password;

    public LoginDTO(){}

    public LoginDTO(String username, String password){
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }
}
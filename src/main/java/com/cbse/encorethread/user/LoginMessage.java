package com.cbse.encorethread.user;

public class LoginMessage {
    private String message;
    private Boolean status;
    private Integer userId;

    public LoginMessage(String message, Boolean status, Integer userId) {
        this.message = message;
        this.status = status;
        this.userId = userId;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}

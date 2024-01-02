package com.cbse.encorethread.dto;

public class PasswordResetDTO {
    private String oldPassword;
    private String newPassword;

    public PasswordResetDTO(String oldPassword, String newPassword){
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword(){
        return this.oldPassword;
    }

    public String getNewPassword(){
        return this.newPassword;
    }
}

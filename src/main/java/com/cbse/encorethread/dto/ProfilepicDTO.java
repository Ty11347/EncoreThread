package com.cbse.encorethread.dto;

public class ProfilepicDTO {

    private Long userId;
    private String profilepic;

    public ProfilepicDTO() {
    }

    public ProfilepicDTO(Long userId, String profilepic) {
        this.userId = userId;
        this.profilepic = profilepic;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getProfilepic() {
        return profilepic;
    }

    public void setProfilepic(String profilepic) {
        this.profilepic = profilepic;
    }

    @Override
    public String toString() {
        return "ProfilepicDTO{" +
                "userId=" + userId +
                ", profilepic='" + profilepic + '\'' +
                '}';
    }

}

package com.cbse.encorethread.service;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.ProfilepicDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.user.LoginMessage;

public interface UserService {
    String addUser(UserDTO userDTO);
    LoginMessage loginUser(LoginDTO loginDTO);
    UserDTO getUserById(Long userId);
    User updateUserById(Long id, User user);
    void deleteUserById(Long userId);
    boolean changePassword(Long userId, String oldPassword, String newPassword);
    void updateProfilePic(Long userId, String profilepic);
}
package com.cbse.encorethread.service;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.ProfilepicDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.user.LoginMessage;

public interface UserService {
    String addUser(UserDTO userDTO);
    LoginMessage loginUser(LoginDTO loginDTO);
    UserDTO getUserById(Integer userId);
    User updateUserById(Integer id, User user);
    void deleteUserById(Integer userId, Integer cartId);
    boolean changePassword(Integer userId, String oldPassword, String newPassword);
    void updateProfilePic(Integer userId, String profilepic);
    String getRoleById(Integer userId);
}
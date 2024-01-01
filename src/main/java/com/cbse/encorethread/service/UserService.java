package com.cbse.encorethread.service;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.user.LoginMessage;

public interface UserService {
    String addUser(User user);
    LoginMessage loginUser(LoginDTO loginDTO);
    UserDTO getUserById(Long userId);
<<<<<<< HEAD
}
=======
}
>>>>>>> b79c09baacdc5ccb0decd225770a881b9dd3d6f3

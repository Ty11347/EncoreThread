package com.cbse.encorethread.user;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.ProfilepicDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.repository.UserRepository;
import com.cbse.encorethread.service.UserService;
import com.cbse.encorethread.exception.UserNotFoundException;
import com.cbse.encorethread.user.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Resource;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

import com.cbse.encorethread.exception.ResourceNotFoundException;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setAge(user.getAge());
        userDTO.setAddress(user.getAddress());
        userDTO.setContact(user.getContact());
        userDTO.setRoles(user.getRoles());
        userDTO.setProfilepic(user.getProfilepic());
        return userDTO;
    }

    @Override
    public String addUser(UserDTO userDTO) {
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            // Handle the case where password is null or empty
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        User user_new = new User(
                userDTO.getUserId(),
                userDTO.getUsername(),
                userDTO.getEmail(),
                userDTO.getAge(),
                userDTO.getAddress(),
                userDTO.getContact(),
                userDTO.getRoles(),
                this.passwordEncoder.encode(userDTO.getPassword()),
                userDTO.getProfilepic()
        );

        if (userDTO.getProfilepic() != null && !userDTO.getProfilepic().isEmpty()) {
            user_new.setProfilepic(userDTO.getProfilepic());
        }

        userRepository.save(user_new);
        return userDTO.getUsername();
    }

    User user;

    @Override
    public LoginMessage loginUser(LoginDTO loginDTO) {
        String msg = "";
        User user1 = userRepository.findByUsername(loginDTO.getUsername());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> user = userRepository.findOneByUsernameAndPassword(loginDTO.getUsername(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginMessage("Login Success", true, user.get().getId());
                } else {
                    return new LoginMessage("Login Failed", false, null);
                }
            } else {
                return new LoginMessage("Password Not Match", false, user.getId());
            }
        } else {
            return new LoginMessage("Username not exists", false, null);
        }
    }

    @Override
    public UserDTO getUserById(Long userId) {
        return userRepository.findById(userId)
            .map(this::convertToUserDTO)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
    }

    public User updateUserById(Long id, User user) {
        User user1 = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        // Update user details
        user1.setUsername(user.getUsername());
        user1.setEmail(user.getEmail());
        user1.setContact(user.getContact());
        user1.setAge(user.getAge());
        user1.setAddress(user.getAddress());
        //user1.setRoles(user.getRoles());
        return userRepository.save(user1);
    }

    @Override
    public void deleteUserById(Long userId) {
        User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        userRepository.deleteById(userId);
    }

    @Override
    public boolean changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
    }


    @Override
    public void updateProfilePic(Long userId, String profilepic) {
        User existingUser = userRepository.findById(userId).orElse(null);

        if (existingUser != null) {
            existingUser.setProfilepic(profilepic);

            userRepository.save(existingUser);
        } else {
            System.out.println("User with ID " + userId + " not found");
        }
    }

    @Override
    public String getRoleById(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        return user.getRoles();
    }
}

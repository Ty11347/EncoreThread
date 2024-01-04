package com.cbse.encorethread.controller;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.dto.ProfilepicDTO;
import com.cbse.encorethread.dto.PasswordResetDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.service.UserService;
import com.cbse.encorethread.user.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO){
        System.out.println(userDTO.getProfilepic());
        if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            // Return an error response or throw an exception
            return ResponseEntity
                .badRequest()
                .body("Password cannot be null or empty");
        }
        String id = userService.addUser(userDTO);
        return ResponseEntity.ok(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        LoginMessage loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("userId") Long userId) {
        UserDTO userDTO = userService.getUserById(userId);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<User> updateUserById(@PathVariable Long userId, @RequestBody User user) {
        User updatedUser = userService.updateUserById(userId, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{userId}/delete")
    public ResponseEntity<String> deleteUserById(@PathVariable("userId") Long userId){
        userService.deleteUserById(userId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }

    @PutMapping("/{userId}/changePw")
    public ResponseEntity<?> changPassword(@PathVariable Long userId, @RequestBody PasswordResetDTO passwordResetDTO){
        try {
            userService.changePassword(userId, passwordResetDTO.getOldPassword(), passwordResetDTO.getNewPassword());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{userId}/update/profilepic")
    public ResponseEntity<Void> updateProfilepic(@PathVariable Long userId, @RequestBody ProfilepicDTO profilepicDTO) {
        userService.updateProfilePic(userId, profilepicDTO.getProfilepic());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/role")
    public ResponseEntity<String> getRoleById(@PathVariable Long userId){
        userService.getRoleById(userId);
        return new ResponseEntity<>("User role successfully retrieved!", HttpStatus.OK);
    }
}

package com.cbse.encorethread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.repository.UserRepository;
import com.cbse.encorethread.service.UserService;
import com.cbse.encorethread.user.LoginMessage;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(path = "/save")
    public String registerUser(@RequestBody UserDTO userDTO){
        String id = userService.addUser(userDTO);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
        LoginMessage loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}


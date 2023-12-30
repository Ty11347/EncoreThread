package com.cbse.encorethread.user;

import org.springframework.stereotype.Service;

import com.cbse.encorethread.dto.LoginDTO;
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
import java.util.Optional;

@Service
public class UserImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserDTO convertToUserDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setAge(user.getAge());
        userDTO.setAddress(user.getAddress());
        userDTO.setContact(user.getContact());
        userDTO.setRoles(user.getRoles());
        return userDTO;
    }

    @Override
    public String addUser(User user) {
        User user_new = new User(
            user.getUserId(),
            user.getUsername(),
            user.getEmail(),
            user.getAge(),
            user.getAddress(),
            user.getContact(),
            user.getRoles(),
            this.passwordEncoder.encode(user.getPassword())
        );
        userRepository.save(user_new);
        return user.getUsername();
    }
    User user;

    @Override
    public LoginMessage loginUser(LoginDTO loginDTO){
        String msg="";
        User user1 = userRepository.findByUsername(loginDTO.getUsername());
        if(user1!=null){
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if(isPwdRight){
                Optional<User> user = userRepository.findOneByUsernameAndPassword(loginDTO.getUsername(), encodedPassword);
                if(user.isPresent()){
                    return new LoginMessage("Login Success", true, user.get().getUserId());
                }else{
                    return new LoginMessage("Login Failed", false, null);
                }
            }else{
                return new LoginMessage("Password Not Match", false, user.getUserId());
            }
        }else{
            return new LoginMessage("Username not exists", false, null);
        }
    }

    @Override
    public UserDTO getUserById(Long userId) {
        return userRepository.findById(userId)
            .map(this::convertToUserDTO)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        }
    }
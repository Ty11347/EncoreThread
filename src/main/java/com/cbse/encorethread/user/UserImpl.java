package com.cbse.encorethread.user;

import org.springframework.stereotype.Service;

import com.cbse.encorethread.dto.LoginDTO;
import com.cbse.encorethread.dto.UserDTO;
import com.cbse.encorethread.model.User;
import com.cbse.encorethread.repository.UserRepository;
import com.cbse.encorethread.service.UserService;
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

    @Override
    public String addUser(UserDTO userDTO) {
        User user = new User(
            userDTO.getUserId(),
            userDTO.getUsername(),
            userDTO.getEmail(),
            this.passwordEncoder.encode(userDTO.getPassword()),
            userDTO.getRoles(),
            userDTO.getAge(),
            userDTO.getContact()
        );
        userRepository.save(user);
        return user.getUsername();
    }
    UserDTO userDTO;

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
                    return new LoginMessage("Login Success", true);
                }else{
                    return new LoginMessage("Login Failed", false);
                }
            }else{
                return new LoginMessage("Password Not Match", false);
            }
        }else{
            return new LoginMessage("Username not exists", false);
        }
    }
}

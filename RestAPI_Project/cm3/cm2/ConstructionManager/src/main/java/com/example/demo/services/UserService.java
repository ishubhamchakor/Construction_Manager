package com.example.demo.services;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public User registerUser(User user) {
        // Check if the role exists in the database
        if (user.getRole() != null) {
            Optional<Role> role = roleRepository.findById(user.getRole().getRoleId());
            role.ifPresent(user::setRole);
        }
        return userRepository.save(user);
    }

    public boolean validateLogin(String email, String password, Role role) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user.getRole() != null && user.getRole().equals(role);
        }
        return false;
    }
}

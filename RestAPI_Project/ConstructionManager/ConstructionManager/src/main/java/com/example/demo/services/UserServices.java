package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserServices {

    @Autowired
    private UserRepository urepo;

    @Autowired
    private RoleRepository rrepo;

    public ResponseEntity<String> registerUser(User user) {
        // Check if the username already exists
        if (urepo.countByName(user.getName()) > 0) {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }

        // Check Name Cannot Be Empty
        if (user.getName().isEmpty()) {
            throw new IllegalArgumentException("User Name cannot be empty");
        }

        // Validate all fields are not null
        if (user.getName() == null || user.getPassword() == null || user.getEmail() == null) {
            return new ResponseEntity<>("All fields are required", HttpStatus.BAD_REQUEST);
        }

        // Fetch and assign role to user
        Role role = rrepo.findById(user.getRole().getRoleID()).orElse(null);
        if (role == null) {
            return new ResponseEntity<>("Role not found", HttpStatus.BAD_REQUEST);
        }
        user.setRole(role);

        // Save the new user
        urepo.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = urepo.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
        
            return user;  // Return the user if login is successful
        }
        return Optional.empty();  // Return empty if user not found or credentials invalid
    }

    public Optional<User> findUserByEmail(String email) {
        return urepo.findByEmail(email);
    }
}

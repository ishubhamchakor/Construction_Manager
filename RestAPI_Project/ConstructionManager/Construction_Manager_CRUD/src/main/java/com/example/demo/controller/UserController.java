package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.services.UserServices;

@RestController
@CrossOrigin(origins = "http://localhost:3017")
public class UserController {

	@Autowired
	private UserServices uservice;

	@Autowired
	private RoleRepository urepo;

	@PostMapping("/newUser")
	public ResponseEntity<String> new_user(@RequestBody User ur) {

		return uservice.registerUser(ur);
	}

	// Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        // Perform login by matching email and password
        Optional<User> loggedInUser = uservice.loginUser(user.getEmail(), user.getPassword());

        // If user found, return 200 OK with the user details
        if (loggedInUser.isPresent()) {
            return ResponseEntity.ok(loggedInUser.get());
        } else {
            // If not found, return 401 Unauthorized with an error message
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

}
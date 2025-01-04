package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.entities.UserLoginRequest;
import com.example.demo.repository.RoleRepository;
import com.example.demo.services.UserServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserServices user;

	@Autowired
	private RoleRepository urepo;

	@PostMapping("/newUser")
	public ResponseEntity<String> new_user(@RequestBody User ur) {

		return user.registerUser(ur);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody UserLoginRequest loginRequest) {
	    // Ensure email and password are provided
	    if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() || 
	        loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                             .body(Map.of("message", "Email or password is missing"));
	    }

	    System.out.println("Received login request for email: " + loginRequest.getEmail());

	    // Validate login credentials
	    int roleID = user.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());

	    if (roleID != -1) {
	        System.out.println("Login successful for email: " + loginRequest.getEmail());
	        return ResponseEntity.ok(Map.of(
	            "message", "Login successful!",
	            "roleID", roleID
	        ));
	    } else {
	        System.out.println("Invalid login attempt for email: " + loginRequest.getEmail());
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body(Map.of("message", "Invalid email or password"));
	    }
	}

}

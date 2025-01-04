package com.example.demo.services;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserServices {


	@Autowired
	private UserRepository urepo;
	public ResponseEntity<String> registerUser(User user) {
		System.out.print(user);

		// Check if the username already exists
		if (urepo.countByName(user.getName()) > 0) {
			return new ResponseEntity<>("Username already taken", HttpStatus.BAD_REQUEST);
		}

		// check Name Cannot Be Empty
		if (user.getName().isEmpty()) {
			throw new IllegalArgumentException("User Name Canot Be Emty");
		}

		// Validate all fields are not null
		if (user.getName() == null || user.getPassword() == null || user.getEmail() == null) {
			return new ResponseEntity<>("All fields are required", HttpStatus.BAD_REQUEST);
		}

		// Save the new user
		urepo.save(user);
		return new ResponseEntity<>("User registered successfully", HttpStatus.OK);	
		
	}

	public int validateLogin(String email, String password) {
	    // Fetch the user from the database by email
	    User user = urepo.findByEmail(email);

	    // Check if the user exists and the password matches
	    if (user != null && user.getPassword().equals(password)) {
	        return user.getRole().getRoleID(); // Return role ID instead of name
	    }

	    // Return a default value (e.g., -1) to indicate invalid login
	    return -1;
	}


}

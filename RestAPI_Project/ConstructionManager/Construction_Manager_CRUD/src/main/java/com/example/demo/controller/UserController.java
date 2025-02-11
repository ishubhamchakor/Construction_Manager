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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.entities.UserLoginRequest;
import com.example.demo.repository.RoleRepository;
import com.example.demo.services.UserServices;

//@CrossOrigin(origins = "http://localhost:3017")
@RequestMapping("/crud")
@RestController()
public class UserController {

	@Autowired
	private UserServices user;

	@Autowired
	private RoleRepository urepo;


	@GetMapping("/project-managers")
    public ResponseEntity<List<User>> getProjectManagers() {
        List<User> managers = user.getProjectManagers();
        return ResponseEntity.ok(managers);
    }

	
	@GetMapping("/users/site-engineers")
    public List<User> getSiteEngineers() {
        return user.getSiteEngineers();
    }
}

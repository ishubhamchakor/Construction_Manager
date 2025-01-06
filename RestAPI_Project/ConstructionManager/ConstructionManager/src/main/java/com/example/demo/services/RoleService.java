package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Role;
import com.example.demo.repository.RoleRepository;

@Service
	public class RoleService {

	    @Autowired
	    private RoleRepository roleRepository;

	    public Role getRoleById(Integer roleId) {
	        return roleRepository.findById(roleId).orElse(null);
	    }
	}

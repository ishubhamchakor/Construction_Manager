package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Find user by name, password, and role
	 // int countByNameAndPasswordAndRole_Name(String name, String password, String roleName);

	
	User findByEmail (String name);
	
   //  Find user by name and email
//    int countByNameAndEmail(String username, String email);
    
//
//    // Update user password by name
//    @Modifying
//    @Transactional
//    @Query("UPDATE User u SET u.password = :password WHERE u.name = :name")
//    int updatePasswordByName(String name, String password);
} 
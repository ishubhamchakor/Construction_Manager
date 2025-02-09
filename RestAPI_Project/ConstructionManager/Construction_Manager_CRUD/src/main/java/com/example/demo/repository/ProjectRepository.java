package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Project;
import com.example.demo.entities.User;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
	
	   Project findByProjectid(int projectid);; // Find by project ID 

	
	   @Query("SELECT p FROM Project p WHERE p.managedBy.UserID = :userId")
	    List<Project> findByManagedByUserId(@Param("userId") int userId);
	
}
package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Issues;

@Repository
public interface IssuesRepository extends JpaRepository<Issues, Integer> {

	List<Issues> findByTask_Taskid(int taskId);
	
}


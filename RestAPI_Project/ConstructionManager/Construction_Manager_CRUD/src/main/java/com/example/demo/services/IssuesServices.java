package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Issues;
import com.example.demo.repository.IssuesRepository;

@Service
public class IssuesServices {
	
	@Autowired
	IssuesRepository repo;
	
	public String saveIssues(Issues issue) {
		repo.save(issue);
		return " response save Succesfully";
	}
	
	public List<Issues> getIssues() {
		return repo.findAll();
	}
		
}
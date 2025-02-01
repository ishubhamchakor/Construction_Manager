package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Issues;
import com.example.demo.services.IssuesServices;

@RestController
public class IssuesController {
	
	@Autowired
	IssuesServices iservice;
	
	@PostMapping("/issues")
	public String saveIssues(@RequestBody Issues issue) {
		return iservice.saveIssues(issue);
	}
	
	@GetMapping("/getAllIssues")
	public List<Issues> getIssues() {
		return iservice.getIssues();
	}
	
}
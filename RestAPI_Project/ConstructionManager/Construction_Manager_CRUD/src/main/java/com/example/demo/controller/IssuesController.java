package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Issues;
import com.example.demo.services.IssuesServices;

@CrossOrigin(origins = "http://localhost:3017")
@RestController
public class IssuesController {
	
	@Autowired
	IssuesServices iservice;
	
	@PostMapping("/issues/{taskId}")
	public String saveIssues(@RequestBody Issues issue, @PathVariable Integer taskId) {
//		System.out.print("**********"+ issue);
		return iservice.saveIssues(issue,taskId);
	}
	
	@GetMapping("/getAllIssues")
	public List<Issues> getIssues() {
		return iservice.getIssues();
	}
	
//	@GetMapping("/viewIssuesbyprojectId/{projectId}")
//	public List<Issues> getIssuesByProjectId(@PathVariable int id ) {
//		return iservice.getIssues();
//	}
}

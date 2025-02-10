package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Issues;
import com.example.demo.services.IssuesServices;

//@CrossOrigin(origins = "http://localhost:3017")

@RequestMapping("/crud")
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
	

	//change here only for  issue functionality
	
	@GetMapping("/task_Issues/{id}")
	public ResponseEntity<List<Issues>> getIssuesByTaskId(@PathVariable int id) {
	    Optional<List<Issues>> issues = iservice.getIssuesByTasksId(id);
	    
	    if (issues.isPresent() && !issues.get().isEmpty()) {
	        return ResponseEntity.ok(issues.get()); // Return 200 OK with the list of issues
	    } else {
	        return ResponseEntity.noContent().build(); // Return 204 No Content if no issues found
	    }
	}		
	
}


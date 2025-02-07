package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.entities.Issues;
import com.example.demo.entities.Tasks;
import com.example.demo.repository.IssuesRepository;
import com.example.demo.repository.TaskRepository;

@Service
public class IssuesServices {
	
	@Autowired
	IssuesRepository repo;
	
	@Autowired
	TaskRepository taskRepository;
	
	public String saveIssues(Issues issue, Integer taskId) {
		//get task with id = taskId
		Optional<Tasks> optionalTask = taskRepository.findById(taskId);
		if (optionalTask.isPresent()) {
		    issue.setTask(optionalTask.get()); // Safe retrieval
		    repo.save(issue);
		    return "Issue saved successfully!";
		} else {
		    return "Task with ID " + taskId + " not found.";
		}

	}
	
	public List<Issues> getIssues() {
		return repo.findAll();
	}
	
	
	 public Optional<List<Issues>> getIssuesByTasksId(int taskId) {
	        return Optional.of(repo.findByTask_Taskid(taskId)); // Fetch issues from the repository
	    }
}




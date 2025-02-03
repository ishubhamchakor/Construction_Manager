package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Tasks;
import com.example.demo.repository.TaskRepository;

@Service
public class TasksService {
	
	@Autowired
	TaskRepository repo ;
	
	public String SaveTask(Tasks task) {
		  repo.save(task);
		  return " Task save Succesfully";
	   }
	
	public List<Tasks> getAllTask() {
		 return repo.findAll();
	}

}
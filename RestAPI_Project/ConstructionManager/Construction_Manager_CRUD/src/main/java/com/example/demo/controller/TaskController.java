package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Tasks;
import com.example.demo.services.TaskServices;

@RestController
public class TaskController {
	@Autowired
   TaskServices service ;
	
   @GetMapping("/getAllTask")
	public List<Tasks> getAllTask() {
		 return service.getAllTask();
	}
   
   @PostMapping("/SaveTask")
   public String SaveTask(@RequestBody Tasks task) {
	   return service.SaveTask(task);
   }
}
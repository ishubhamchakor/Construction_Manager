package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Dto.TasksaveDto;
import com.example.demo.entities.Tasks;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.TaskServices;
@CrossOrigin(origins = "http://localhost:3017")
@RestController
public class TaskController {
	@Autowired
   TaskServices service ;
	
   @GetMapping("/getAllTask")
	public List<Tasks> getAllTask() {
		 return service.getAllTask();
	}
   
   @PostMapping("/saveTask")
   public String SaveTask(@RequestBody TasksaveDto task) {
	   
		
	   return service.SaveTask(task);
   }
   
   @GetMapping("/getAllTaskprojectbyId/{id}")
   public List<Tasks> findTaskByProject_Projectid(@PathVariable int id){
	   System.out.println("i am here"+id);
	   return  service.findTaskByProject_Projectid(id);

   }
    
}

package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.demo.Dto.TasksaveDto;
import com.example.demo.entities.Tasks;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.TaskServices;

//@CrossOrigin(origins = "http://localhost:3017")
@RestController
@RequestMapping("/crud")
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
 
   @GetMapping("/projectTask/{id}")
   public ResponseEntity<List<Tasks>> getTasksByProjectId(@PathVariable("id") int id) {
       System.out.println("Received project ID: " + id); // Log the received ID
       List<Tasks> tasks = service.findTaskByProject_Projectid(id);
       if (tasks.isEmpty()) {
           return ResponseEntity.noContent().build(); // Return 204 No Content if no tasks found
       }
       return ResponseEntity.ok(tasks); // Return 200 OK with the list of tasks
   }
      
}
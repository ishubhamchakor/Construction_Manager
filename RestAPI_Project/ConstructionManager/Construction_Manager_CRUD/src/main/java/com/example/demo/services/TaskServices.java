package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.TasksaveDto;
import com.example.demo.entities.Project;
import com.example.demo.entities.Tasks;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.TaskRepository;

@Service
public class TaskServices {
	
	@Autowired
	TaskRepository repo ;
	
	 @Autowired
	    ProjectRepository project_repo;
	
	  public String SaveTask(TasksaveDto task) {
	        // Validate the incoming task DTO
	        if (task == null) {
	            return "Task data is missing.";
	        }

	        // Retrieve the project using the project ID from the DTO
	        Project taskproject = project_repo.findByProjectid(task.getProjectid());
	        
	        // Check if the project exists
	        if (taskproject == null) {
	            return "Project not found.";
	        }

	        // Create a new Tasks entity
	        Tasks newtask = new Tasks();
	        
	        // Set the properties of the new task from the DTO
	        newtask.setDescription(task.getDescription());
	        newtask.setDuedate(task.getDuedate());
	        newtask.setTaskname(task.getTaskname());
	        newtask.setStartdate(task.getStartdate());
	        newtask.setPriority(task.getPriority());
	        
	        // Associate the task with the project
	        newtask.setProject(taskproject);
	        
	        // Save the new task to the repository
	        repo.save(newtask);
	        
	        return "Task saved successfully";
	    }
	
	
	
	public List<Tasks> getAllTask() {
		 return repo.findAll();
	}

	
	  public List<Tasks> findTaskByProject_Projectid(int id){
//		    return  repo.findTaskByProject_Id(id);
		   return repo.findTaskByProject_Projectid(id);
	   }
	
	

}

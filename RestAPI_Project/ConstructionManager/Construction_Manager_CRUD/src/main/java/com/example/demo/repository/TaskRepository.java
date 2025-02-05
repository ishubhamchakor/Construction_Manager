package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Tasks;

public interface TaskRepository extends JpaRepository<Tasks, Integer> {
	
	 
//	 List<Tasks> getAllTaskByProjectId(int projectId);
	
	  @Query("SELECT t FROM Tasks t WHERE t.project.projectid = :projectid") 
	    List<Tasks> findTasksByProjectId(@Param("projectid") int projectId);
	
	List<Tasks> findTaskByProject_Projectid(int projectid);

}

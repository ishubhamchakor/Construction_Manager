package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Project;
import com.example.demo.services.ProjectServices;

@RestController
@RequestMapping("/api")  // Add a base path for all endpoints
@CrossOrigin(origins = "http://localhost:3017")
public class ProjectController {
    
    @Autowired
    private ProjectServices projectService;

    @GetMapping("/getAllProject")
    public List<Project> getAllProject() {
        return projectService.getAllProject();
    }
    

    @PostMapping("/newProject")
    public ResponseEntity<?> registerProject(
            @RequestParam("name") String projectName,
            @RequestParam("description") String description,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @RequestParam("status") String status,
            @RequestParam("managedBy") Integer managedBy,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            Project project = projectService.registerProject(
                    projectName, description, startDate, endDate, status, managedBy, file
            );
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error registering project: " + e.getMessage());
        }
    }
}

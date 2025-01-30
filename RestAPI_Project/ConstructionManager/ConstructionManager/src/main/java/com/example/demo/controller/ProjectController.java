package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.Project;
import com.example.demo.services.ProjectServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

  private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

  @Autowired
  private ProjectServices projectService;

  @PostMapping("/newProject")
  public ResponseEntity<?> registerProject(@RequestBody Project project) {
    try {
      Project registeredProject = projectService.registerProject(project);
      return ResponseEntity.ok(registeredProject);
    } catch (Exception e) {
      logger.error("Error registering project: ", e);
      return ResponseEntity.badRequest().body("Error registering project: " + e.getMessage());
    }
  }
}

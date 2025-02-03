package com.example.demo.controller;

import java.io.IOException;
import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Project;
import com.example.demo.entities.User;
import com.example.demo.services.ProjectServices;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:3017")
public class ProjectController {
	@Autowired
    private ProjectServices projectService;

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
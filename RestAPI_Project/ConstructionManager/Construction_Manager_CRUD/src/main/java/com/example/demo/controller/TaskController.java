package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Tasks;
import com.example.demo.services.TasksService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3017")
public class TaskController {
    @Autowired
    TasksService service;

    @GetMapping("/getAllTask")
    public List<Tasks> getAllTask() {
        return service.getAllTask();
    }

    @PostMapping("/SaveTask")
    public String SaveTask(@RequestParam("task") String taskJson,
                           @RequestParam(value = "fileattachment", required = false) MultipartFile file) {
        try {
            // Convert taskJson to Tasks object
            ObjectMapper objectMapper = new ObjectMapper();
            Tasks task = objectMapper.readValue(taskJson, Tasks.class);

            // Process file and task as needed
            return service.SaveTask(task);
        } catch (Exception e) {
            return "Error saving task: " + e.getMessage();
        }
    }
}



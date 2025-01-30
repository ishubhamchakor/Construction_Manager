package com.example.demo.services;



import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Project;
import com.example.demo.entities.User;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.UserRepository;
@Service
public class ProjectServices {
	@Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public Project registerProject(String projectName, String description, 
                                   String startDate, String endDate, 
                                   String status, Integer managedBy, 
                                   MultipartFile file) throws IOException {

        // Fetch User by managedBy (userID)
        User manager = userRepository.findById(managedBy)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + managedBy));

        Project project = new Project();
        project.setProjectName(projectName);
        project.setDescription(description);
        project.setStartDate(java.sql.Date.valueOf(startDate));
        project.setEndDate(java.sql.Date.valueOf(endDate));
        project.setStatus(status);
        project.setManagedBy(manager);
        project.setFileAttachment(file != null ? file.getBytes() : null);

        return projectRepository.save(project);
    }
}
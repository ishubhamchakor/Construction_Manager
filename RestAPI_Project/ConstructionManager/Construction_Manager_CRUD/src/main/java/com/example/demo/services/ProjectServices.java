package com.example.demo.services;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entities.Project;
import com.example.demo.entities.User;
import com.example.demo.repository.ProjectRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ProjectServices {

    @Autowired
    ProjectRepository project_repo;

    @Autowired
    private UserRepository userRepository;

    public List<Project> getAllProject() {
        List<Project> projects = project_repo.findAll();
        System.out.println("Fetched Projects: " + projects);  // Debug log
        return projects;
    }
    
 

    public Project registerProject(String projectName, String description, 
                                   String startDate, String endDate, 
                                   Integer managedBy, 
                                   MultipartFile file) throws IOException {

        // Fetch User by managedBy (userID)
        User manager = userRepository.findById(managedBy)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + managedBy));

        Project project = new Project();
        project.setProjectName(projectName);
        project.setDescription(description);
        project.setStartDate(java.sql.Date.valueOf(startDate));
        project.setEndDate(java.sql.Date.valueOf(endDate));
        //project.setStatus(status);
        project.setManagedBy(manager);
        project.setFileAttachment(file != null ? file.getBytes() : null);

        return project_repo.save(project);
    }
}

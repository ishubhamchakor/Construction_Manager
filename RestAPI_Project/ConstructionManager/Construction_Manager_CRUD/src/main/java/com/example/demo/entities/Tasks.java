package com.example.demo.entities;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Matches MySQL AUTO_INCREMENT
    @Column(name = "taskid")
    private Long id;

    @Column(name = "taskname")
    private String taskname;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "startdate")
    private LocalDate startdate;
 
    
    @Column(name = "duedate")
    private LocalDate duedate;

    @Column(name = "priority", nullable = false, length = 50)
    private String priority;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @ManyToOne
    @JoinColumn(name = "assignedto", referencedColumnName = "UserID")
    private User assignedto;

    @ManyToOne
    @JoinColumn(name = "assignedby", referencedColumnName = "UserID")
    private User assignedby;

    @Lob
    @Column(name = "fileattachment", columnDefinition = "BLOB")
    private byte[] fileattachment;

    @ManyToOne
    @JoinColumn(name = "projectid", referencedColumnName = "projectid") // ✅ Correct: References ProjectID
    @JsonIgnore
    private Project project;
    
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Issues> issues;
}
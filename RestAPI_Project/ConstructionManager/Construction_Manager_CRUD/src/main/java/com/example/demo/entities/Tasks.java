package com.example.demo.entities;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskid") // ✅ Consistent naming
    private Long taskid;

    @Column(name = "taskname") // ✅ Ensure not null
    private String taskname;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "startdate")
    private Date startdate;

    @Column(name = "duedate")
    private Date duedate;

    @Column(name = "priority")
    private String priority;

    @Column(name = "status")
    private String status;

//    // ✅ Task assigned to a user
//    @ManyToOne
//    @JoinColumn(name = "assignedto", referencedColumnName = "UserID")
//    @JsonIgnore
//    private User assignedto;

//    // ✅ Task assigned by a user
//    @ManyToOne
//    @JoinColumn(name = "assignedby", referencedColumnName = "UserID")
//    private User assignedby;

    @Lob
    @Column(name = "fileattachment", columnDefinition = "BLOB")
    @JsonIgnore
    private byte[] fileattachment;

    // ✅ Many tasks belong to one project
    @ManyToOne
    @JoinColumn(name = "projectid", referencedColumnName = "projectid") 
    
    @JsonIgnore 
    private Project project;

    // ✅ A task can have multiple issues
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Issues> issues;
}















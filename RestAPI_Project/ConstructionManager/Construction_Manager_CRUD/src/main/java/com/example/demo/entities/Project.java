package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "projects")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "projectid") // ✅ Use snake_case for consistency
    private Integer projectid;

    @Column(name = "project_name", length = 255, nullable = false)
    private String projectName;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

//    @Column(name = "status", length = 50, nullable = false)
//    private String status;

    @Lob
    @Column(name = "file_attachment", columnDefinition = "LONGBLOB")
    private byte[] fileAttachment;

    // ✅ ManagedBy Relationship (Many Projects can be managed by One User)
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managed_by")
    private User managedBy;
    
//    // ✅ CreatedBy Relationship (Many Projects can be created by One User)
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "created_by", referencedColumnName = "UserID", nullable = true)
//    private User createdBy;

    // ✅ One project can have many tasks
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
//    @JoinColumn(name = "taskid", nullable = false)
    private List<Tasks> tasks;
}

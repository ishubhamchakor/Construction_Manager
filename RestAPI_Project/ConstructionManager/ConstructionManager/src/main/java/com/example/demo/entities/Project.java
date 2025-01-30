package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Project {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projectID;

    @Column(name = "projectName", length = 255, nullable = false)
    private String projectName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String Description;

    @Column(name = "startDate", nullable = false)
   
    private Date startDate;

    @Column(name = "EndDate", nullable = false)

    private Date endDate;

    @Column(length = 50, nullable = false)
    private String Status;

    @Lob
    @Column(name = "file_attachment", columnDefinition = "LONGBLOB")
    private byte[] fileAttachment;

    
    
    @ManyToOne(fetch = FetchType.LAZY) // Allow NULL if needed
    @JoinColumn(name = "ManagedBy", referencedColumnName = "UserID", nullable = false)
    private User managedBy;

    
	   

}

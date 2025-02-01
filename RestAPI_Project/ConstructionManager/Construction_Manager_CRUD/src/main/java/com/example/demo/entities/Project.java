package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;
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
  private Integer projectID;

  @Column(name = "projectName", length = 255, nullable = false)
  private String projectName;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String description;

  @Column(name = "startDate", nullable = false)
  private Date startDate;

  @Column(name = "EndDate", nullable = false)
  private Date endDate;

  @Column(length = 50, nullable = false)
  private String status;

  @Lob
  @Column(name = "file_attachment", columnDefinition = "LONGBLOB")
  private byte[] fileAttachment;

  @ManyToOne(fetch = FetchType.LAZY) 
  @JoinColumn(name = "ManagedBy", referencedColumnName = "UserID", nullable = false)
  @JsonBackReference // Prevents recursion during JSON serialization
  private User managedBy;
  
//✅ Added mapping for CreatedBy
 @ManyToOne(fetch = FetchType.LAZY)
 @JoinColumn(name = "CreatedBy", referencedColumnName = "UserID", nullable = true)
 @JsonBackReference
 private User createdBy;
}




package com.example.demo.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="issues")
public class Issues {

	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name="issueid")
	private int issueid;
	

	@ManyToOne
    @JoinColumn(name = "raisedby", referencedColumnName = "UserID")
	private User raisedby;

	
	@ManyToOne
    @JoinColumn(name = "taskid", nullable = false)
	
    private Tasks task = new Tasks();
;

	@Column(name = "description",columnDefinition = "TEXT")
    private String description;

	@Column(name = "status")
    private String status;

	@ManyToOne
    @JoinColumn(name = "resolvedby", referencedColumnName = "UserID")
	@JsonIgnore
	private User resolvedby;
	
}
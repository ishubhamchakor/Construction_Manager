package com.example.demo.entities;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer UserID;
	 	
	 	@Column(name="Name",nullable = false)
	    private String name;
	 	
	 	@Column(name="Email",nullable = false)
	    private String email;
	 	
	 	@Column(name="Password",nullable = false)
	    private String password;
	    

	 	 @ManyToOne(fetch = FetchType.LAZY)
	     @JoinColumn(name = "RoleID", referencedColumnName = "RoleID",nullable = false) // Foreign key mapping
	 	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "users"})
	     private Role role;
	 	 
	 	 @OneToMany(mappedBy = "managedBy", fetch = FetchType.LAZY)
	     private Set<Project> projects ;
	 	 
	 	   
}
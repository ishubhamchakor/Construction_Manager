package com.example.demo.entities;


import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class Role {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
    private Integer RoleID;
  	
  	@Column(name="role_name",nullable = false)
    private String name;
  	
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<User> users;
  	
  	 public String getName() {
         return name;
     }

     public void setName(String name) {
         this.name = name;
     }
}

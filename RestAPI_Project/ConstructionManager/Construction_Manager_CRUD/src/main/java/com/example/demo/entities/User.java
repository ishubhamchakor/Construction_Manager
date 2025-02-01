package com.example.demo.entities;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
  private Integer userID;

  @Column(name="Name", nullable = false)
  private String name;

  @Column(name="Email", nullable = false)
  private String email;

  @Column(name="Password", nullable = false)
  private String password;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "RoleID", referencedColumnName = "RoleID", nullable = false)
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "users"})
  private Role role;

  @OneToMany(mappedBy = "managedBy", fetch = FetchType.LAZY)
  @JsonManagedReference // Manages the reference properly during JSON serialization
  private Set<Project> projects;
}

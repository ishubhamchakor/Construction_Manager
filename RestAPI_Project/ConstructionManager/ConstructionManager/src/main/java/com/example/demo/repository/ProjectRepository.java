package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}

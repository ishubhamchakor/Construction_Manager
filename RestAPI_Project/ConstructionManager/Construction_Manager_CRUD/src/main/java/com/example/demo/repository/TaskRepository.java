package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Tasks;

public interface TaskRepository extends JpaRepository<Tasks, Integer> {

}
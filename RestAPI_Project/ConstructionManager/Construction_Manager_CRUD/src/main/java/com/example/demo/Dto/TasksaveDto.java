package com.example.demo.Dto;

import java.util.Date;

public class TasksaveDto {
    private String taskname;      // Task Name
    private String description;    // Task Description
    private Date startdate;      // Start Date
    private Date duedate;        // Due Date
    private String priority;        // Task Priority
    private String file;           // File attachment (if any)
    private int projectid;    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public TasksaveDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	// Project ID
	public String getTaskname() {
		return taskname;
	}
	public void setTaskname(String taskname) {
		this.taskname = taskname;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getStartdate() {
		return startdate;
	}
	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}
	public Date getDuedate() {
		return duedate;
	}
	public void setDuedate(Date duedate) {
		this.duedate = duedate;
	}
	public String getPriority() {
		return priority;
	}
	public void setPriority(String priority) {
		this.priority = priority;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public int  getProjectid() {
		return projectid;
	}
	public void setProjectid(int projectid) {
		this.projectid = projectid;
	}
}
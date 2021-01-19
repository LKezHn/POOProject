<%@page import="Classes.Auth"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%

	if(request.getParameter("action") != null){
		if(request.getParameter("action").toString().trim().equals("validateUser")){
			if((new Auth()).sessionIsValid(request, session)){
				out.print("{\"status\":true}");
			}
		}
	}else{
		out.print("{\"status\":false}");
	}

%>
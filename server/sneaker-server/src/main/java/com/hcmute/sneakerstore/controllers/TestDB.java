package com.hcmute.sneakerstore.controllers;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDate;

import com.hcmute.sneakerstore.business.Location;
import com.hcmute.sneakerstore.business.User;


@WebServlet("/test")
public class TestDB extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		
		try (EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakerdb");
				EntityManager em = emf.createEntityManager();) {
			
			EntityTransaction tran = em.getTransaction();
			tran.begin();
			for(int i = 0; i < 5; i++) {
				User user = new User();
				user.setFirstName("LXC");
				user.setLastName("Non");
				user.setGender(true);
				user.setBirthday(LocalDate.now());
				user.setPhoneNumber("012");
				
				user.setAddress(new Location("VN", "ThuDuc", "HCM"));
				em.persist(user);
			}
			tran.commit();
			
			
		} catch (Exception ex) {
			ex.printStackTrace();
			response.getWriter().println("Hello2 world!");
		}
		response.getWriter().println("Hello world!");
	}

}

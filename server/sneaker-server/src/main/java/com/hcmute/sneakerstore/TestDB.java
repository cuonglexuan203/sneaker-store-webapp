package com.hcmute.sneakerstore;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transaction;

import java.io.IOException;

@WebServlet("/test")
public class TestDB extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try (EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakerdb");
				EntityManager em = emf.createEntityManager();) {
			User user = new User();
			user.setUser_id(1);
			user.setFirstname("Cuong");
			
			EntityTransaction tran = em.getTransaction();
			tran.begin();

			em.persist(user);
			tran.commit();
			response.getWriter().println(user.getUser_id() + ": " + user.getFirstname());
		} catch (Exception ex) {

		}
	}

}

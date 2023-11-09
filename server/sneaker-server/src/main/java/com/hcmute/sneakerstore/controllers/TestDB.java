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
import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.business.enums.Color;


@WebServlet("/test")
public class TestDB extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int a = 0;
		
		try (EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakerdb");
				EntityManager em = emf.createEntityManager();) {
			
			EntityTransaction tran = em.getTransaction();
			tran.begin();
			for(int i = 0; i < 1; i++) {
				User user = new User();
				user.setFirstName("LXC");
				user.setLastName("Non");
				user.setGender(true);
				user.setBirthday(LocalDate.now());
				user.setPhoneNumber("012");
				
				user.setAddress(new Location("VN", "ThuDuc", "HCM"));
				em.persist(user);
				
				
				
			}
			
			Product p = new Product();
			p.setBrand("A");
			p.setName("Air force 1");
			p.setEan("123");
			p.setPrice(5.f);
			p.setDateAdded(LocalDate.now());
			p.setDateUpdated(LocalDate.now());
			p.setImageUrl("");
			
			ProductInventory pi = new ProductInventory(2, Color.BLACK, 15);
			ProductInventory pi2 = new ProductInventory(9, Color.BLUE, 17);
			ProductInventory pi3 = new ProductInventory(9, Color.BLACK, 17);
			p.addProductInventory(pi);
			p.addProductInventory(pi2);
			p.addProductInventory(pi3);
			
			em.persist(p);
			a = p.getProductCountBySize(17);
			tran.commit();
			
			
		} catch (Exception ex) {
			ex.printStackTrace();
			response.getWriter().println("Hello2 world!");
		}
		response.getWriter().println("Hello world!: " + a);
	}

}

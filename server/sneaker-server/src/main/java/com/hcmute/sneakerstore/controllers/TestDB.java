package com.hcmute.sneakerstore.controllers;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Cleanup;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.hcmute.sneakerstore.business.Location;
import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.business.enums.Color;
import com.hcmute.sneakerstore.data.AccountDao;
import com.hcmute.sneakerstore.data.ProductDao;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.JpaProvider;


@WebServlet("/test")
public class TestDB extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int a = 0;
		
		@Cleanup EntityManager em = JpaProvider.getEntityManager();
		EntityTransaction tran = em.getTransaction();
		/*
		 * Query query = em.createQuery("delete from ProductInventory");
		 * DBUtils.executeUpdateOrDelete(query, tran);
		 */
		
		
		Product p = Product.builder()
				.brand("Hamiing")
				.name("Air force 1")
				.ean("2342")
				.price(123.11f)
				.dateAdded(LocalDate.now())
				.dateUpdated(LocalDate.now())
				.imageUrl("http://image")
				.build();
				
				
		
		
		long p2 = ProductDao.insertOne(p);
		
		
		
		
//			tran.begin();
//			for(int i = 0; i < 1; i++) {
//				User user = User.builder().firstName("Lxc")
//													.lastName("Non")
//													.gender(true)
//													.birthday(LocalDate.now())
//													.phoneNumber("25646161")
//													.address(new Location("VN", "ThuDuc", "HCM"))
//													.build();
		
//				
//				em.persist(user);
//			}
//			Product p = Product.builder()
//								.brand("Hamiing")
//								.name("Air force 1")
//								.ean("2342")
//								.price(123.11f)
//								.dateAdded(LocalDate.now())
//								.dateUpdated(LocalDate.now())
//								.imageUrl("http://image")
//								.build();
//
//			
//			ProductInventory pi = ProductInventory.builder()
//									.productAmount(12)
//									.color(Color.GRAY)
//									.size(14)
//									.build();
//			ProductInventory pi2 = ProductInventory.builder()
//					.productAmount(13)
//					.color(Color.GRAY)
//					.size(19)
//					.build();
//			ProductInventory pi3 = ProductInventory.builder()
//					.productAmount(1)
//					.color(Color.RED)
//					.size(14)
//					.build();
//			
//			p.addProductInventory(pi);
//			p.addProductInventory(pi2);
//			p.addProductInventory(pi3);
//			
//			em.persist(p);
//			a = p.getProductCountBySize(17);
//			tran.commit();
			
			
		response.getWriter().println("Hello world!: " + p2);
	}

}

package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.utils.GsonProvider;

@WebServlet("/products")
public class ProductsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
    	res.setContentType("application/json");
    	
    	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow only your frontend
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    	
    	List<Product> ps = ProductDao.selectMany();
    	res.getWriter().write(GsonProvider.getGsonInstance().toJson(ps));
    }

}

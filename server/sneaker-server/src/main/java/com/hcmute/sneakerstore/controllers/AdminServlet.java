package com.hcmute.sneakerstore.controllers;

import java.io.IOException;
import java.util.List;

import com.hcmute.sneakerstore.DTOs.ProductResDto;
import com.hcmute.sneakerstore.services.AdminService;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/admin/products")
public class AdminServlet extends HttpServlet {

	private AdminService adminService;

	@Override
	public void init() {
		adminService = new AdminService();
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// Business processing
		List<ProductResDto> adminProducts = adminService.getAllProducts();
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, adminProducts);
	}

}

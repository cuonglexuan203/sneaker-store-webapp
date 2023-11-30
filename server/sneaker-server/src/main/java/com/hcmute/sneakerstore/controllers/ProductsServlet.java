package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import com.hcmute.sneakerstore.model.*;
import com.hcmute.sneakerstore.services.ProductService;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;

@WebServlet("/products")
public class ProductsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private ProductService productService;

	@Override
	public void init() {
		productService = new ProductService();
	}
	
	// get products for home page
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {

		// Business processing
		List<Product> ps = productService.getAllProducts();
		//
		if (ps != null) {

			HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, ps);
			return;
		}
		//
		HttpResponseHandler.sendErrorResponse(res, res.SC_INTERNAL_SERVER_ERROR,
				StatusMessage.SM_INTERNAL_SERVER_ERROR.getDescription());
	}

}

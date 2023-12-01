package com.hcmute.sneakerstore.controllers;

import java.io.IOException;

import com.hcmute.sneakerstore.DTOs.ProductResDto;
import com.hcmute.sneakerstore.services.ProductService;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.PathParams;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/products/*")
public class ProductServlet extends HttpServlet {

	private static final long serialVersionUID = 3359810340026853619L;

	private ProductService productService;

	@Override
	public void init() {
		productService = new ProductService();
	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {

		// Preprocessing raw request
		PathParams pathParams = new PathParams(req);
		String productIdStr = pathParams.get(0);
		//
		if (ValidationUtils.isNullOrEmpty(productIdStr)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND, StatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		long productId = 0;
		try {
			productId = Long.parseLong(productIdStr);
		} catch (NumberFormatException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		// Business processing
		ProductResDto resBody = productService.getProductResDto(productId);
		if (resBody != null) {

			HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, resBody);
			return;
		}
		//
		HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND, StatusMessage.SM_NOT_FOUND.getDescription());
		return;
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		doGet(req, res);
	}
}

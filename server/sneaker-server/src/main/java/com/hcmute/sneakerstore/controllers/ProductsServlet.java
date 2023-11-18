package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

import com.hcmute.sneakerstore.business.*;
import com.hcmute.sneakerstore.data.DAOs.*;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.ProductStatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/products")
public class ProductsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws IOException {

		List<Product> ps = ProductDao.selectMany();
		//
		if (ValidationUtils.isNullOrEmpty(ps)) {

			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					ProductStatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK,
				ps);
		
	}

}

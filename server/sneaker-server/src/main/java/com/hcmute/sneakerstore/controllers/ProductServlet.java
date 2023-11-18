package com.hcmute.sneakerstore.controllers;

import java.io.IOException;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.ProductStatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/products/*")
public class ProductServlet extends HttpServlet {

	private static final long serialVersionUID = 3359810340026853619L;

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		
		String pathInfor = req.getPathInfo();
		String[] pathInforArr = pathInfor.split("/");
		String productIdStr = (pathInforArr.length > 1 ? pathInforArr[1]
				: null);
		//
		if (ValidationUtils.isNullOrEmpty(productIdStr)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					ProductStatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		long productId = 0;
		try {
			productId = Long.parseLong(productIdStr);
		} catch (NumberFormatException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					ProductStatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		Product product = ProductDao.selectOne(productId);
		//
		if (product == null) {

			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					ProductStatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, product);
	}
	
	@Override
	public void doPost (HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		doGet(req, res);
	}
}

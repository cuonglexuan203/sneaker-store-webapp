package com.hcmute.sneakerstore.controllers;

import java.io.IOException;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.data.DAOs.CartDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.PathParams;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/carts/*")
public class CartServlet extends HttpServlet {

	private static final long serialVersionUID = 3359810340026853619L;

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws IOException {

		PathParams pathParams = new PathParams(req);
		String userIdStr = pathParams.get(0);
		//
		if (ValidationUtils.isNullOrEmpty(userIdStr)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					StatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		long userId = 0;
		try {
			userId = Long.parseLong(userIdStr);
		} catch (NumberFormatException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					StatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		User user = UserDao.selectOne(userId);
		//
		if (user == null) {

			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
					StatusMessage.SM_NOT_FOUND.getDescription());
			return;
		}
		//
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, user.cart);
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		doGet(req, res);
	}
}

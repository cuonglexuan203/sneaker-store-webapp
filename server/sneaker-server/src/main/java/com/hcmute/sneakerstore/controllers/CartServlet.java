package com.hcmute.sneakerstore.controllers;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.business.enums.Color;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.DAOs.CartDao;
import com.hcmute.sneakerstore.data.DAOs.LineItemDao;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.PathParams;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws IOException {

		String userIdStr = req.getParameter("id");
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
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		User user = UserDao.selectOne(userId);
		if (user != null) {
			Cart cart = user.getCart();
			HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, cart);
			return;
		}
		//

		HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND,
				StatusMessage.SM_NOT_FOUND.getDescription());
		return;
	}

	@Data
	private class LineItemAdditionRequestBody {
		private Color color;
		private int size;
		private int quantity;
		private long productId;
		private long userId;

		public boolean isValid() {
			if (color == null || size <= 0 || quantity <= 0 || productId <= 0
					|| userId <= 0) {
				return false;
			}
			return true;
		}

		public LineItem getLineItem() {
			if (!isValid()) {
				return null;
			}

			Product product = ProductDao.selectOne(productId);
			if (product == null) {
				return null;
			}
			//
			User user = UserDao.selectOne(userId);
			if (user == null) {
				return null;
			}
			Cart cart = user.getCart();
			// Create new LineItem
			LineItem newLineItem = LineItem.builder()
					.color(color)
					.size(size)
					.quantity(quantity)
					.product(product)
					.cart(cart)
					.build();
			return newLineItem;
		}
	}

	// Add a lineItem into cart
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws IOException {

		String body = (String) req.getAttribute("body");
		//
		if (!ValidationUtils.isNullOrEmpty(body)) {

			//
			try {
				LineItemAdditionRequestBody lineItemData = GsonProvider
						.getGsonInstance()
						.fromJson(body, LineItemAdditionRequestBody.class);

				//
				if (!lineItemData.isValid()) {
					HttpResponseHandler.sendErrorResponse(res,
							res.SC_BAD_REQUEST,
							StatusMessage.SM_BAD_REQUEST.getDescription());
					return;
				}

				// Create new line item
				LineItem newLineItem = lineItemData.getLineItem();
				//
				if (newLineItem != null) {

					// persist lineItem
					long insertedLineItemId = LineItemDao
							.insertOne(newLineItem);
					//

					if (insertedLineItemId != DBUtils.FAILED_ID) {
						HttpResponseHandler.sendSuccessResponse(res,
								res.SC_CREATED,
								StatusMessage.SM_CREATED.getDescription());
						return;
					}

				}

			} catch (JsonSyntaxException err) {
				// Give more information ...
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
				StatusMessage.SM_BAD_REQUEST.getDescription());

	}
}

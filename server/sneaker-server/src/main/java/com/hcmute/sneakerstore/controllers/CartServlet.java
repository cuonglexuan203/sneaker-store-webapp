package com.hcmute.sneakerstore.controllers;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.DTOs.LineItemAdditionReqDto;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.services.CartService;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
	private CartService cartService;

	@Override
	public void init() {
		cartService = new CartService();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {

		// Preprocessing raw request
		String userIdStr = req.getParameter("userId");
		//
		if (ValidationUtils.isNullOrEmpty(userIdStr)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND, StatusMessage.SM_NOT_FOUND.getDescription());
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
		// Business processing
		Cart cart = cartService.getUserCart(userId);
		if (cart != null) {
			HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, cart);
			return;
		}
		//
		HttpResponseHandler.sendErrorResponse(res, res.SC_NOT_FOUND, StatusMessage.SM_NOT_FOUND.getDescription());
		return;
	}

	// Add a lineItem into cart
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// Preprocessing raw request
		String body = (String) req.getAttribute("body");
		//
		if (!ValidationUtils.isNullOrEmpty(body)) {

			//
			try {
				LineItemAdditionReqDto lineItemData = GsonProvider.getGsonInstance().fromJson(body,
						LineItemAdditionReqDto.class);

				//
				if (!lineItemData.isValid()) {
					HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
							StatusMessage.SM_BAD_REQUEST.getDescription());
					return;
				}
				// Business processing
				boolean result = cartService.addLineItem(lineItemData);
				if (result) {
					HttpResponseHandler.sendSuccessResponse(res, res.SC_CREATED,
							StatusMessage.SM_CREATED.getDescription());
					return;
				}

			} catch (JsonSyntaxException err) {
				// Give more information ...
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
		}

		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());

	}

	// Empty cart
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// Preprocessing raw request
		String userIdStr = req.getParameter("userId");
		if (!ValidationUtils.isNullOrEmpty(userIdStr)) {
			try {
				long userId = Long.parseLong(userIdStr);
				if (userId > 0) {
					// Business processing
					boolean result = cartService.emptyCart(userId);
					if (result) {
						HttpResponseHandler.sendSuccessResponse(res, res.SC_OK, StatusMessage.SM_OK.getDescription());
						return;
					}
				}
			} catch (NumberFormatException err) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}
}

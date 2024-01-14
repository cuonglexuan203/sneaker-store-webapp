package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.utils.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.model.Account;
import com.hcmute.sneakerstore.services.AuthService;
import jakarta.servlet.http.HttpSession;

@WebServlet("/auth/signin")
public class SignInServlet extends HttpServlet {

	private AuthService authService;

	@Override
	public void init() {
		authService = new AuthService();
	}

	// Add account
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// Preprocessing raw request
		String body = (String) req.getAttribute("body");
		//
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}
		//
		try {

			Account account = GsonProvider.getGsonInstance().fromJson(body, Account.class);
			//
			if (account == null) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
			// Business processing
			Map<String, Object> jsonResponse = authService.signIn(account);
			// Success
			if (jsonResponse.get("user") != null) {
				HttpSession session = req.getSession();
				AuthService.establishUserSession(session, jsonResponse);
//				CrossSiteCookie.addSessionIdHeader(session.getId(), res); // use in case of different domains
				//
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, jsonResponse);
				return;
			}

		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}
		// Failed
		HttpResponseHandler.sendErrorResponse(res, res.SC_UNAUTHORIZED, StatusMessage.SM_UNAUTHORIZED.getDescription());

	}

}

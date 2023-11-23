package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DAOs.AccountDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/auth/signin")
public class SignInServlet extends HttpServlet {

	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		String body = (String) req.getAttribute("body");
		//
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}
		//
		try {

			Account account = GsonProvider.getGsonInstance()
					.fromJson(body, Account.class);
			//
			if (account == null) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
			//

			Account managedAccount = AccountDao
					.selectOne(account.getUsername());
			if (managedAccount == null) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}

			// Success
			if (managedAccount.getPassword()
					.equals(account.getPassword())) {
				//
				User authenticatedUser = managedAccount.getUser();
				Map<String, Object> jsonResponse = new HashMap<>();
				//
				jsonResponse.put("id", Long.toString(managedAccount.getId()));
				jsonResponse.put("role", managedAccount.getRole()
						.toString());
				jsonResponse.put("user", authenticatedUser);
				//
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK,
						jsonResponse);
			}
			// Failed
			else {
				HttpResponseHandler.sendErrorResponse(res, res.SC_UNAUTHORIZED,
						StatusMessage.SM_UNAUTHORIZED.getDescription());
			}

		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}

	}

}

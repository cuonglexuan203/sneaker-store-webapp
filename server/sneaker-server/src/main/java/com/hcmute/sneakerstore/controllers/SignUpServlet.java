package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Map;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.DTOs.SignUpReqDto;
import com.hcmute.sneakerstore.services.AuthService;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/auth/signup")
public class SignUpServlet extends HttpServlet {

	private AuthService authService;

	@Override
	public void init() {
		authService = new AuthService();
	}

	// add new user
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// Preprocessing raw request
		String body = (String) req.getAttribute("body");
		//
		if (!ValidationUtils.isNullOrEmpty(body)) {
			//
			try {
				SignUpReqDto signUpData = GsonProvider.getGsonInstance().fromJson(body, SignUpReqDto.class);
				if (signUpData != null) {
					// Business processing
					Map<String, Object> jsonResponse = authService.signUp(signUpData);
					if (jsonResponse.get("user") != null) {
						HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_CREATED, jsonResponse);
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
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

}

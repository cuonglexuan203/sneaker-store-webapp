package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.DAOs.AccountDao;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.DTOs.SignUpReqDto;
import com.hcmute.sneakerstore.model.Account;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.Identifiable;
import com.hcmute.sneakerstore.model.Invoice;
import com.hcmute.sneakerstore.model.Location;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.services.AuthService;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.PasswordVerification;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import com.mysql.cj.x.protobuf.MysqlxCrud.Insert;

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

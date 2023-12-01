package com.hcmute.sneakerstore.controllers;

import java.io.IOException;

import com.google.gson.JsonParseException;
import com.hcmute.sneakerstore.DTOs.ChangePasswordReqDto;
import com.hcmute.sneakerstore.services.UserService;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/changepassword")
public class ChangePasswordServlet extends HttpServlet {

	private UserService userService;

	@Override
	public void init() {
		userService = new UserService();
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// Preprocessing raw request
		String body = (String) req.getAttribute("body");
		//
		if (!ValidationUtils.isNullOrEmpty(body)) {
			try {
				ChangePasswordReqDto reqBody = GsonProvider.getGsonInstance().fromJson(body,
						ChangePasswordReqDto.class);
				if (reqBody != null) {
					long userId = reqBody.getUserId();
					String currentPassword = reqBody.getCurrentPassword();
					String newPassword = reqBody.getNewPassword();
					//
					if (userId > 0 && !ValidationUtils.isNullOrEmpty(currentPassword)
							&& !ValidationUtils.isNullOrEmpty(newPassword)) {
						// Business processing
						boolean result = userService.changePassword(userId, currentPassword, newPassword);
						if (result) {
							HttpResponseHandler.sendSuccessResponse(res, res.SC_OK,
									StatusMessage.SM_OK.getDescription());
							return;
						}
					}
				}
			} catch (JsonParseException err) {
				System.out.println(err.getMessage());
			}
		}
		HttpResponseHandler.sendSuccessResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}
}

package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.model.Identifiable;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.services.UserService;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/users")
public class UsersServlet extends HttpServlet {

	private static final long serialVersionUID = 5029190992902649308L;

	private UserService userService;

	@Override
	public void init() {
		userService = new UserService();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		List<User> users = userService.getAllUsers();

		if (users != null) {
			HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, users);
			return;
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_INTERNAL_SERVER_ERROR,
				StatusMessage.SM_INTERNAL_SERVER_ERROR.getDescription());
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
		//
		String body = (String) req.getAttribute("body");
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		try {
			User newUser = GsonProvider.getGsonInstance().fromJson(body, User.class);
			if (newUser != null) {
				//
				long insertedUserId = userService.addUser(newUser);
				if (insertedUserId != 0) {
					HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_CREATED, insertedUserId);
					return;
				}
				//
			}
		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException {
		// preprocessing raw request
		String body = (String) req.getAttribute("body");
		//
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		try {
			User updatedUser = GsonProvider.getGsonInstance().fromJson(body, User.class);
			//
			if (updatedUser != null) {
				// Business processing
				boolean result = userService.updateUser(updatedUser);
				if (result) {
					HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, StatusMessage.SM_OK.getDescription());
					return;
				}
				//
			}
		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());
	}

//
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String body = (String) req.getAttribute("body");
		//
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		try {
			Identifiable deletedUser = GsonProvider.getGsonInstance().fromJson(body,
					com.hcmute.sneakerstore.DTOs.EntityDto.class);
			//
			boolean result = userService.deleteUser(deletedUser);
			if (result) {
				HttpResponseHandler.sendSuccessResponse(res, res.SC_OK, StatusMessage.SM_DELETED.getDescription());
				return;
			}
			//
		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST, StatusMessage.SM_BAD_REQUEST.getDescription());

	}

}

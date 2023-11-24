package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import com.google.gson.JsonSyntaxException;
import com.hcmute.sneakerstore.business.Identifiable;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/users")
public class UsersServlet extends HttpServlet {

	private static final long serialVersionUID = 5029190992902649308L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		List<User> users = UserDao.selectMany();

		if (users == null) {
			HttpResponseHandler.sendErrorResponse(res,
					res.SC_INTERNAL_SERVER_ERROR,
					StatusMessage.SM_INTERNAL_SERVER_ERROR.getDescription());
			return;
		}

		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, users);

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		//
		String body = (String) req.getAttribute("body");
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		try {
			User newUser = GsonProvider.getGsonInstance()
					.fromJson(body, User.class);
			if (newUser != null) {
				//
				long insertedUserId = UserDao.insertOne(newUser);
				//
				if (insertedUserId == DBUtils.FAILED_ID) {
					HttpResponseHandler.sendErrorResponse(res,
							res.SC_BAD_REQUEST,
							StatusMessage.SM_BAD_REQUEST.getDescription());
					return;
				}
				//
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_CREATED,
						insertedUserId);
			}
		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}

	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		//
		String body = (String) req.getAttribute("body");
		//
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		try {
			User updatedUser = GsonProvider.getGsonInstance()
					.fromJson(body, User.class);
			//
			if (updatedUser != null) {

				User oldUser = UserDao.selectOne(updatedUser.getId());
				//
				if (oldUser == null) {
					HttpResponseHandler.sendErrorResponse(res,
							res.SC_BAD_REQUEST,
							StatusMessage.SM_BAD_REQUEST.getDescription());
					return;
				}
				// copy relationships
				updatedUser.setInvoices(oldUser.getInvoices());
				updatedUser.setCart(oldUser.getCart());
				updatedUser.setAccount(oldUser.getAccount());
				//
				User managedUser = UserDao.updateOne(updatedUser);
				//
				if (managedUser == null) {
					HttpResponseHandler.sendErrorResponse(res,
							res.SC_BAD_REQUEST,
							StatusMessage.SM_BAD_REQUEST.getDescription());
					return;
				}
				//
				HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK,
						managedUser);
			}
		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}

	}

//
	private class Entity implements Identifiable {
		private long id;

		@Override
		public long getId() {
			return id;
		}
	}

//
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse res)
			throws IOException {
		String body = (String) req.getAttribute("body");
		//
		if (ValidationUtils.isNullOrEmpty(body)) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
			return;
		}
		//
		try {
			Identifiable deletedUser = GsonProvider.getGsonInstance()
					.fromJson(body,
							com.hcmute.sneakerstore.controllers.UsersServlet.Entity.class);
			//

			long deletedUserId = deletedUser.getId();
			long resultId = UserDao.deleteOne(deletedUserId);
			//
			if (resultId == DBUtils.FAILED_ID) {
				HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
						StatusMessage.SM_BAD_REQUEST.getDescription());
				return;
			}
			//
			HttpResponseHandler.sendSuccessResponse(res, res.SC_OK,
					StatusMessage.SM_DELETED.getDescription());
		} catch (JsonSyntaxException err) {
			HttpResponseHandler.sendErrorResponse(res, res.SC_BAD_REQUEST,
					StatusMessage.SM_BAD_REQUEST.getDescription());
		}

	}

}

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
import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.Identifiable;
import com.hcmute.sneakerstore.business.Invoice;
import com.hcmute.sneakerstore.business.Location;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DBUtils;
import com.hcmute.sneakerstore.data.DAOs.AccountDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;
import com.hcmute.sneakerstore.utils.ValidationUtils;
import com.mysql.cj.x.protobuf.MysqlxCrud.Insert;

@WebServlet("/auth/signup")
public class SignUpServlet extends HttpServlet {

	@Data
	private class SignUpData {
		private User user;
		private Account account;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		String body = (String) req.getAttribute("body");
		if (!ValidationUtils.isNullOrEmpty(body)) {

			//
			try {
				SignUpData signUpData = GsonProvider.getGsonInstance()
						.fromJson(body, SignUpData.class);

				// Add new user
				User newUser = signUpData.getUser();

				//
				if (newUser != null) {

					// Add account for user
					Account newAccount = signUpData.getAccount();
					//
					if (newAccount != null) {

						newUser.addAccount(newAccount);
						// Validate new User data, Account data

						// add cart for user
						Cart newCart = Cart.builder().build();
						newUser.addCart(newCart);
						//
						long insertedUserId = UserDao.insertOne(newUser);
						//
						
						if (insertedUserId != DBUtils.FAILED_ID) {
							Map<String, Object> jsonResponse = new HashMap<>();
							//
							jsonResponse.put("id", Long.toString(insertedUserId));
							jsonResponse.put("role", newAccount.getRole()
									.toString());
							jsonResponse.put("user", newUser);
							HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_CREATED,
									jsonResponse);
							return;
						}
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

package com.hcmute.sneakerstore.services;

import java.util.HashMap;
import java.util.Map;

import com.hcmute.sneakerstore.DAOs.AccountDao;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.DTOs.SignUpReqDto;
import com.hcmute.sneakerstore.model.Account;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.PasswordVerification;

public class AuthService {
	private AccountDao accountDao;
	private UserDao userDao;

	public AuthService() {
		accountDao = new AccountDao();
		userDao = new UserDao();
	}

	public Map<String, Object> signIn(Account account) {
		Map<String, Object> jsonResponse = new HashMap<>();
		Account managedAccount = accountDao.findByUsername(account.getUsername());

		if (managedAccount != null) {
			// existing username
			String hashedPassword = managedAccount.getPassword();
			String password = account.getPassword();
			// Verify password
			if (PasswordVerification.verifyPassword(password, hashedPassword)) {
				//
				User authenticatedUser = managedAccount.getUser();
				//
				jsonResponse.put("accountId", Long.toString(managedAccount.getId()));
				jsonResponse.put("role", managedAccount.getRole().toString());
				jsonResponse.put("user", authenticatedUser);
			}
		}

		return jsonResponse;
	}

	public Map<String, Object> signUp(SignUpReqDto signUpData) {
		Map<String, Object> jsonResponse = new HashMap<>();
		User newUser = signUpData.getUser();
		Account newAccount = signUpData.getAccount();

		//
		if (newUser != null) {

			if (newAccount != null) {
				// Hashing password
				String hasedPassword = PasswordVerification.hashPassword(newAccount.getPassword());
				newAccount.setPassword(hasedPassword);
				// Add account for user
				newUser.addAccount(newAccount);
				// Validate new User data, Account data

				// add cart for user
				Cart newCart = Cart.builder().build();
				newUser.addCart(newCart);
				// persist user
				long insertedUserId = userDao.add(newUser);
				//

				if (insertedUserId != DBUtils.FAILED_ID) {
					jsonResponse.put("accountId", Long.toString(insertedUserId));
					jsonResponse.put("role", newAccount.getRole().toString());
					jsonResponse.put("user", newUser);
				}
			}

		}
		return jsonResponse;
	}

}

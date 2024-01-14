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
import com.hcmute.sneakerstore.utils.EmailSender;
import com.hcmute.sneakerstore.utils.PasswordVerification;
import jakarta.servlet.http.HttpSession;

public class AuthService {
	private AccountDao accountDao;
	private UserDao userDao;

	public enum AuthenticatedUserKey{
		ACCOUNT_ID("accountId"),
		ROLE("role"),
		USER("user");



		private String storedKey = "";
		AuthenticatedUserKey(String value){
			storedKey = value;
		}
		public String getStoredKey() {
			return storedKey;
		}
	}

	public AuthService() {
		accountDao = new AccountDao();
		userDao = new UserDao();
	}

	public Map<String, Object> signIn(Account account) {
		Map<String, Object> jsonResponse = null;
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
				String accountId = Long.toString(managedAccount.getId());
				String newAccountRoleStr = managedAccount.getRole().toString();
				jsonResponse = getAuthenticatedDataMap(accountId, newAccountRoleStr, authenticatedUser);

			}
		}

		return jsonResponse;
	}

	public Map<String, Object> signUp(SignUpReqDto signUpData) {
		Map<String, Object> jsonResponse = null;
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
					String accountId = Long.toString(insertedUserId);
					String newAccountRoleStr = newAccount.getRole().toString();
					jsonResponse = getAuthenticatedDataMap(accountId, newAccountRoleStr, newUser);
					//
					String htmlText = "<h1>Thanks for your Sign Up<h1>";
					EmailSender.sendHtmlMail("cuongit2003@gmail.com", newUser.getEmail(), newUser.getFirstName() + " " + newUser.getLastName(), "Sneaker Store Sign Up Successfully", htmlText);
				}
			}

		}
		return jsonResponse;
	}

	public static Map<String, Object> getAuthenticatedDataMap(String accountId, String role, User user){
		Map<String, Object> jsonResponse = new HashMap<>();
		jsonResponse.put(AuthenticatedUserKey.ACCOUNT_ID.getStoredKey(), accountId);
		jsonResponse.put(AuthenticatedUserKey.ROLE.getStoredKey(), role);
		jsonResponse.put(AuthenticatedUserKey.USER.getStoredKey(), user);
		return jsonResponse;
	}

	public static void establishUserSession(HttpSession session, Map<String, Object> authenticatedUserData){
		String accountId = (String) authenticatedUserData.get(AuthenticatedUserKey.ACCOUNT_ID.getStoredKey());
		String userRole = (String) authenticatedUserData.get(AuthenticatedUserKey.ROLE.getStoredKey());
		User user = (User) authenticatedUserData.get(AuthenticatedUserKey.USER.getStoredKey());
		//
		session.setAttribute(AuthenticatedUserKey.ACCOUNT_ID.getStoredKey(), accountId);
		session.setAttribute(AuthenticatedUserKey.ROLE.getStoredKey(), userRole);
		session.setAttribute(AuthenticatedUserKey.USER.getStoredKey(), user);
	}
}

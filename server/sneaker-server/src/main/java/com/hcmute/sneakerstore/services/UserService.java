package com.hcmute.sneakerstore.services;

import java.util.List;

import com.hcmute.sneakerstore.DAOs.AccountDao;
import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.model.Account;
import com.hcmute.sneakerstore.model.Identifiable;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.PasswordVerification;

public class UserService {
	private UserDao userDao;

	public UserService() {
		userDao = DaoFactory.getUserDao();
	}

	public List<User> getAllUsers() {
		return userDao.findAll();
	}

	// 0: failed, others: successed
	public long addUser(User newUser) {
		long insertedUserId = userDao.add(newUser);
		//
		if (insertedUserId != DBUtils.FAILED_ID) {
			return insertedUserId;
		}
		return 0;
	}

	public boolean updateUser(User revisedUser) {
		User existingUser = userDao.findById(revisedUser.getId());
		//
		if (existingUser != null) {
			// copy properties
			existingUser.setFirstName(revisedUser.getFirstName());
			existingUser.setLastName(revisedUser.getLastName());
			existingUser.setEmail(revisedUser.getEmail());
			existingUser.setGender(revisedUser.getGender());
			existingUser.setBirthday(revisedUser.getBirthday());
			existingUser.setPhoneNumber(revisedUser.getPhoneNumber());
			existingUser.setAddress(revisedUser.getAddress());
			existingUser.setImageUrl(revisedUser.getImageUrl());
			//
			User managedUser = userDao.update(existingUser);
			//
			if (managedUser != null) {
				return true;
			}
		}
		return false;

	}

	public boolean deleteUser(Identifiable deletedUser) {
		long deletedUserId = deletedUser.getId();
		long resultId = userDao.delete(deletedUserId);
		//
		if (resultId != DBUtils.FAILED_ID) {

			return true;
		}
		return false;
	}

	public boolean changePassword(long userId, String currentPassword, String newPassword) {
		User user = userDao.findById(userId);
		if (user != null) {
			Account account = user.getAccount();
			if(PasswordVerification.verifyPassword(currentPassword, account.getPassword())) {
				String newHashedPassword = PasswordVerification.hashPassword(newPassword);
				account.setPassword(newHashedPassword);
				userDao.update(user);
				return true;
			}
		}
		return false;
	}
}

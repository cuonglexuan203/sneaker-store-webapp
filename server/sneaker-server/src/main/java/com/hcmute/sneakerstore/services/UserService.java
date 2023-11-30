package com.hcmute.sneakerstore.services;

import java.util.List;

import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.model.Identifiable;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;

public class UserService {
	private UserDao userDao;

	public UserService() {
		userDao = new UserDao();
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
		User oldUser = userDao.findById(revisedUser.getId());
		//
		if (oldUser != null) {
			// copy properties

			// copy relationships
			revisedUser.setInvoices(oldUser.getInvoices());
			revisedUser.setCart(oldUser.getCart());
			revisedUser.setAccount(oldUser.getAccount());
			//
			User managedUser = userDao.update(revisedUser);
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
}

package com.hcmute.sneakerstore.utils;
import com.password4j.Hash;
import com.password4j.Password;

public class PasswordVerification {
	public static String hashPassword(String password) {
		if(ValidationUtils.isNullOrEmpty(password)) {
			return null;
		}
		//
		Hash hash = Password.hash(password).withBcrypt();
		return hash.getResult();
	}
	
	public static boolean verifyPassword(String password, String hash) {
		if(ValidationUtils.isNullOrEmpty(password)) {
			return false;
		}
		if(ValidationUtils.isNullOrEmpty(hash)) {
			return false;
		}
		//
		return Password.check(password, hash).withBcrypt();
	}
}

package com.hcmute.sneakerstore.utils;

import java.util.List;

public class ValidationUtils {
	public static boolean isNullOrEmpty(String str) {

		if (str == null) {
			return true;
		}

		if (str.isBlank()) {
			return true;
		}
		return false;
	}

	public static <T> boolean isNullOrEmpty(List<T> list) {
		if (list == null)
			return true;
		if (list.size() == 0)
			return true;
		return false;
	}

	public static <T> boolean isNullOrEmpty(T[] list) {
		if (list == null)
			return true;
		if (list.length == 0)
			return true;
		return false;
	}
	
}

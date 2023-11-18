package com.hcmute.sneakerstore.utils;


import jakarta.servlet.http.Cookie;

public class CookieUtil {
	public static String getCookie(Cookie[] cookies, String cookieName) {
		
		if (cookies == null) {
			return null;
		}
		
		
		if (ValidationUtils.isNullOrEmpty(cookieName)) {
			return null;
		}
		
		for (Cookie c : cookies) {
			if (c.getName()
					.equals(cookieName)) {
				return c.getValue();
			}
		}
		return null;
	}
}

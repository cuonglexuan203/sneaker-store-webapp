package com.hcmute.sneakerstore.utils;


import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class CrossSiteCookie {

	private String name;
	private String value;
	//
	private int maxAge;
	private boolean httpOnly;
	@Builder.Default
	private String path = "/";
	private final boolean secure = true;
	private final String sameSite = "None";
	
	@GsonExclude
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	private HttpServletResponse response;

	//

	private Cookie addCrossSiteCookie() {
		Cookie cie = new Cookie(name, value);
		cie.setMaxAge(maxAge);
		cie.setHttpOnly(httpOnly);
		cie.setPath(path);
		cie.setSecure(secure);

		//
		String cookieHeader = String.format(
				"%s=%s; Path=%s; Max-Age=%d; %s; %s; SameSite=%s",
				cie.getName(), cie.getValue(), cie.getPath(), cie.getMaxAge(),
				cie.isHttpOnly() ? "HttpOnly" : "",
						cie.getSecure() ? "Secure" : "" , sameSite);

		response.addHeader("Set-Cookie", cookieHeader);
		
		//
		
		return cie;
	}

	//

	public static CrossSiteCookieBuilder builder() {
		return new CrossSiteCookieBuilder() {
			@Override
			public CrossSiteCookie build() {
				CrossSiteCookie cie = super.build();
				cie.addCrossSiteCookie();
				return cie;
			}
		};
	}
	public static void addSessionIdHeader(String sessionId, HttpServletResponse res){
		int maxAge = 1 * 24 * 60 * 60;
		String path = "/";
		boolean httpOnly = true;

		CrossSiteCookie.builder().name("JSESSIONID").value(sessionId).maxAge(maxAge) //
				.path(path).httpOnly(httpOnly).response(res).build();
	}

}

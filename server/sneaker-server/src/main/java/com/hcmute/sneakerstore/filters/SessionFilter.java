package com.hcmute.sneakerstore.filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

import com.hcmute.sneakerstore.utils.CookieUtil;
import com.hcmute.sneakerstore.utils.CrossSiteCookie;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebFilter(filterName = "SessionFilter")
public class SessionFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		//

		//
		try {
			HttpSession session = req.getSession();
			String sessionId = "";
			//
			if (ValidationUtils.isNullOrEmpty(sessionId)) {
				sessionId = CookieUtil.getCookie(req.getCookies(), "JSESSIONID");
			}
			//
			System.out.println("Existing Session ID: " + sessionId);

			//
			if (ValidationUtils.isNullOrEmpty(sessionId) || !sessionId.equals(session.getId())) {
				sessionId = session.getId();
				//
				System.out.println("New Session ID: " + sessionId);
				//
				int maxAge = 1 * 24 * 60 * 60;
				String path = "/";
				boolean httpOnly = true;

				CrossSiteCookie.builder().name("JSESSIONID").value(sessionId).maxAge(maxAge) //
						.path(path).httpOnly(httpOnly).response(res).build();
			}
			
			//
			chain.doFilter(req, res);
			
		} catch (IllegalStateException err) {
			err.printStackTrace();
		}

	}

}

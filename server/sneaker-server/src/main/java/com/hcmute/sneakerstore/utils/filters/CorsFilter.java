package com.hcmute.sneakerstore.utils.filters;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter(filterName="CorsFilter")
public class CorsFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		//
		String acceptedDomain = "http://localhost:3000";

		//
		res.setHeader("Access-Control-Allow-Origin", acceptedDomain);
		res.setHeader("Access-Control-Allow-Credentials", "true");
		//
		res.setHeader("Access-Control-Allow-Methods",
				"GET, POST, PUT, DELETE, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers",
				"Content-Type, Accept, X-Requested-With, remember-me");
		//
		if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
			res.setStatus(HttpServletResponse.SC_OK);
		}

		chain.doFilter(req, res);
	}

}

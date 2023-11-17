package com.hcmute.sneakerstore.utils;

import java.io.IOException;

import jakarta.servlet.http.HttpServletResponse;

public class HttpResponseHandler {
	public static void sendSuccessResponse(HttpServletResponse res,
			int statusCode, String body) throws IOException {
		res.setStatus(statusCode);
		res.setContentType("text/plain");
		res.setCharacterEncoding("UTF-8");
		res.getWriter()
				.write(body);
	}

	public static void sendSuccessJsonResponse(HttpServletResponse res,
			int statusCode,Object body) throws IOException {
		String jsonBody = GsonProvider.getGsonInstance().toJson(body);
		//
		res.setStatus(statusCode);
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.getWriter()
				.write(jsonBody);
	}

	// modify it
	public static void sendErrorResponse(HttpServletResponse res,
			int statusCode, String message) throws IOException {
		res.setStatus(statusCode);
		res.setContentType("text/plain");
		res.setCharacterEncoding("UTF-8");
		res.getWriter()
				.write(message);
	}

	// modify it
	public static void sendRedirectResponse(HttpServletResponse res,
			int statusCode, String message) throws IOException {
		res.setStatus(statusCode);
		res.setContentType("text/plain");
		res.setCharacterEncoding("UTF-8");
		res.getWriter()
				.write(message);
	}
}

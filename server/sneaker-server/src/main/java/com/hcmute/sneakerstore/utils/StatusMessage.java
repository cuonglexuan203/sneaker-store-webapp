package com.hcmute.sneakerstore.utils;

public enum StatusMessage {
	SM_OK("{"
			+ "  \"statusCode\": 200,"
			+ "  \"message\": \"Success!\""
			+ "}"),
	SM_CREATED("{"
			+ "  \"statusCode\": 201,"
			+ "  \"message\": \"Created successfully!\""
			+ "}"),
	SM_UPDATED("{"
			+ "  \"statusCode\": 200,"
			+ "  \"message\": \"Updated successfully!\""
			+ "}"),
	SM_NOT_FOUND("{"
			+ "  \"statusCode\": 404,"
			+ "  \"message\": \"Not found!\""
			+ "}"),
	SM_DELETED("{"
			+ "  \"statusCode\": 200,"
			+ "  \"message\": \"Deleted successfully\""
			+ "}"),
	SM_BAD_REQUEST("{"
			+ "  \"statusCode\": 400,"
			+ "  \"message\": \"Bad Request: The server cannot process the request due to a client error. Please check your request for any syntax or formatting errors and try again.\""
			+ "}"),
	SM_INTERNAL_SERVER_ERROR("{"
			+ "  \"statusCode\": 500,"
			+ "  \"message\": \"Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the server administrator if the problem persists.\""
			+ "}"),
	SM_UNAUTHORIZED("{"
			+ "  \"statusCode\": 401,"
			+ "  \"message\": \"Unauthorized\""
			+ "}");

	private final String description;

	StatusMessage(String values) {
		this.description = values;
	}

	public String getDescription() {
		return this.description;
	}
}

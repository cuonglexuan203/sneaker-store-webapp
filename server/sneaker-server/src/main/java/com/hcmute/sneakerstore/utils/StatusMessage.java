package com.hcmute.sneakerstore.utils;

public enum StatusMessage {
	SM_OK("Success!"),
	SM_CREATED("Created successfully!"),
	SM_UPDATED("Updated the successfully!"),
	SM_NOT_FOUND("Not found!"),
	SM_DELETED("Deleted the successfully"),
	SM_BAD_REQUEST("Bad Request: The server cannot process the request due to a client error. Please check your request for any syntax or formatting errors and try again."),
	SM_INTERNAL_SERVER_ERROR("Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the server administrator if the problem persists."),
	SM_UNAUTHORIZED("Unauthorized");

	private final String description;

	StatusMessage(String values) {
		this.description = values;
	}
	
	public String getDescription() {
		return this.description;
	}
}

package com.hcmute.sneakerstore.utils;

public enum ProductStatusMessage {
	SM_OK("Success!"),
	SM_CREATED("Created product successfully!"),
	SM_UPDATED("Updated the product successfully!"),
	SM_NOT_FOUND("Not found product!"),
	SM_DELETED("Deleted the product successfully");

	private final String description;

	ProductStatusMessage(String values) {
		this.description = values;
	}
	
	public String getDescription() {
		return this.description;
	}
}

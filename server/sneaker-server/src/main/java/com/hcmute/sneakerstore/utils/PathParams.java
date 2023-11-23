package com.hcmute.sneakerstore.utils;

import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

public class PathParams {
	String[] pathParams;

	public PathParams(HttpServletRequest req) {
		if (req == null) {
			this.pathParams = null;
		}
		//
		List<String> filteredParams = new ArrayList<>();
		String[] rawParams = req.getPathInfo()
				.split("/");
		//
		if(ValidationUtils.isNullOrEmpty(rawParams)) {
			this.pathParams = null;
		}
		//
		for (String s : rawParams) {
			if (!ValidationUtils.isNullOrEmpty(s)) {
				filteredParams.add(s);
			}
		}
		//
		this.pathParams = filteredParams.stream().toArray(String[]:: new);
	}

	public String get(int index) {
		return CollectionUtils.get(pathParams, index);
	}
}

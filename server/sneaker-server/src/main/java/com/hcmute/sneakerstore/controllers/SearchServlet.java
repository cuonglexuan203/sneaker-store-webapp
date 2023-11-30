package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.services.SearchService;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;

@WebServlet("/search")
public class SearchServlet extends HttpServlet {

	private static final long serialVersionUID = -8352307117109040699L;

	private SearchService searchService;

	@Override
	public void init() {
		searchService = new SearchService();
	}

	// Search , filter, sort products
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// preprocessing raw request
		String q = req.getParameter("q");
		String sortIn = req.getParameter("sort");
		String priceStr = req.getParameter("prices");
		String yearStr = req.getParameter("years");
		String genderStr = req.getParameter("genders");
		String kidStr = req.getParameter("kids");
		String colorStr = req.getParameter("colors");
		String saleStr = req.getParameter("sales");
		// Business processing
		Map<String, String> queries = new HashMap<>();
		queries.put("q", q);
		queries.put("sort", sortIn);
		queries.put("prices", priceStr);
		queries.put("years", yearStr);
		queries.put("genders", genderStr);
		queries.put("kids", kidStr);
		queries.put("colors", colorStr);
		queries.put("sales", saleStr);

		List<Product> result = searchService.apply(queries);

		//
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, result);

	}

}

package com.hcmute.sneakerstore.controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.hibernate.internal.build.AllowSysOut;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/search")
public class SearchServlet extends HttpServlet {

	private static final long serialVersionUID = -8352307117109040699L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		//
		String q = req.getParameter("q");
		String sortIn = req.getParameter("sort");
		String priceStr = req.getParameter("prices");
		String yearStr = req.getParameter("years");
		//
		List<Product> result = new ArrayList<>();
		// search
		List<Product> ps = ProductDao.selectMany();
		result = searchProducts(ps, q);

		// filter
		if (!ValidationUtils.isNullOrEmpty(priceStr)) {
			result = filterByPriceRanges(result, priceStr);
		}

		if (!ValidationUtils.isNullOrEmpty(yearStr)) {
			result = filterByYear(result, yearStr);
		}

		// sort
		if (!ValidationUtils.isNullOrEmpty(sortIn)) {
			if (sortIn.equalsIgnoreCase("asc")) {
				result = sortProducts(result,
						Comparator.comparing(Product::getPrice));
			} else if (sortIn.equalsIgnoreCase("desc")) {
				result = sortProducts(result,
						Comparator.comparing(Product::getPrice)
								.reversed());
			} else if (sortIn.equalsIgnoreCase("newest")) {
				result = sortProducts(result,
						Comparator.comparing(Product::getReleaseDate)
								.reversed());
			}
		}

		//
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, result);

	}

	private String labelByYears(String[] years, Product p) {

		String unlabeled = "";
		if (p == null || years == null) {
			return unlabeled;
		}
		//
		for (String year : years) {
			if (Integer.parseInt(year) == p.getReleaseDate()
					.getYear()) {
				return year;
			}
		}

		return unlabeled;
	}

	private Map<String, List<Product>> groupProductsByYear(List<Product> ps,
			String[] years) {
		//
		Map<String, List<Product>> groupedProducts = Optional.ofNullable(ps)
				.map(List::stream)
				.orElseGet(Stream::empty)
				.collect(Collectors.groupingBy((p) -> labelByYears(years, p)));
		return groupedProducts;
	}

	private List<Product> filterByYear(List<Product> ps, String yearStr) {
		if (ValidationUtils.isNullOrEmpty(ps)) {
			return ps;
		}
		//
		List<Product> clonedPs = new ArrayList<>(ps);
		List<Product> result = new ArrayList<>();
		//
		if (!ValidationUtils.isNullOrEmpty(yearStr)) {

			String[] defaultYears = { "2018", "2019", "2020", "2021", "2022",
					"2023", "2024" };
			//
			String splitChar = ",";
			String[] filterdYears = yearStr.split(splitChar);
			//
			Map<String, List<Product>> groupedProducts = groupProductsByYear(
					clonedPs, defaultYears);
			//
			for (String year : filterdYears) {
				if (!ValidationUtils.isNullOrEmpty(year)) {
					List<Product> productsInYear = groupedProducts
							.getOrDefault(year, List.of());
					//
					for (int i = 0; i < clonedPs.size(); i++) {
						for (Product p : productsInYear) {
							if (p.getId() == clonedPs.get(i)
									.getId()) {
								result.add(clonedPs.get(i));
								break;
							}
						}

					}
				}

			}
		}
		return result;
	}

	private String labelByPriceRanges(String[] ranges, Product p) {
		String unlabeled = "";
		String splitChar = "-";
		//
		if (ranges == null) {
			return unlabeled;
		}
		if (p == null) {
			return unlabeled;
		}
		//
		for (String range : ranges) {

			if (!ValidationUtils.isNullOrEmpty(range)) {

				String[] prices = range.split(splitChar);
				if (prices != null) {
					if (prices.length > 1) {

						try {

							float minPrice = Float.parseFloat(prices[0]);
							float maxPrice = Float.parseFloat(prices[1]);
							//
							if (p.getPrice() >= minPrice
									&& p.getPrice() <= maxPrice) {
								return range;
							}

						} catch (Exception err) {
							err.printStackTrace();
						}

					}
				}
			}
		}

		return unlabeled;
	}

	private Map<String, List<Product>> groupProductsByPriceRange(
			List<Product> ps, String[] ranges) {
		//
		Map<String, List<Product>> groupedProducts = Optional.ofNullable(ps)
				.map(List::stream)
				.orElseGet(Stream::empty)
				.collect(Collectors
						.groupingBy((p) -> labelByPriceRanges(ranges, p)));
		return groupedProducts;
	}

	private List<Product> filterByPriceRanges(List<Product> ps,
			String priceStr) {
		if (ValidationUtils.isNullOrEmpty(ps)) {
			return ps;
		}
		//
		List<Product> clonedPs = new ArrayList<>(ps);
		List<Product> result = new ArrayList<>();
		//
		if (!ValidationUtils.isNullOrEmpty(priceStr)) {

			String[] defaultPriceRanges = { "0-99", "100-199", "200-299",
					"300-399", "400-499", "500-999999" };
			//
			String splitChar = ",";
			String[] filterdPriceRanges = priceStr.split(splitChar);
			//
			Map<String, List<Product>> groupedProducts = groupProductsByPriceRange(
					clonedPs, defaultPriceRanges);
			//
			for (String range : filterdPriceRanges) {
				if (!ValidationUtils.isNullOrEmpty(range)) {

					List<Product> productsInRange = groupedProducts
							.getOrDefault(range, List.of());
					if (ValidationUtils.isNullOrEmpty(productsInRange)) {
					}
					//
					for (int i = 0; i < clonedPs.size(); i++) {
						for (Product p : productsInRange) {
							if (p.getId() == clonedPs.get(i)
									.getId()) {
								result.add(clonedPs.get(i));
								break;
							}
						}
					}
				}

			}
		}
		return result;
	}

	private List<Product> sortProducts(List<Product> ps,
			Comparator<Product> comparator) {

		if (comparator == null) {
			return ps;
		}

		List<Product> clonedProducts = Optional.ofNullable(ps)
				.map(List::stream)
				.orElseGet(Stream::empty)
				.collect(Collectors.toList());
		//
		clonedProducts.sort(comparator);
		return clonedProducts;
	}

	protected List<Product> searchProducts(List<Product> ps, String query) {
		//
		if (ValidationUtils.isNullOrEmpty(ps)) {
			return List.of();
		}
		if (ValidationUtils.isNullOrEmpty(query)) {
			return ps;
		}
		//
		String[] words = query.toLowerCase()
				.split(" ");
		//
		List<Product> result = new ArrayList<>();
		//
		for (String word : words) {

			if (ValidationUtils.isNullOrEmpty(word)) {
				continue;
			}
			//
			for (Product p : ps) {
				//
				if (p.getName()
						.toLowerCase()
						.contains(word)) {
					result.add(p);
					continue;
				}

				if (word.contains(p.getName()
						.toLowerCase())) {
					result.add(p);
				}
				//
				Set<String> cates = p.getCategories();
				Iterator<String> itor = cates.iterator();

				while (itor.hasNext()) {
					String caty = itor.next();

					if (caty.toLowerCase()
							.contains(word)) {
						result.add(p);
						break;
					}

					if (word.contains(caty.toLowerCase())) {
						result.add(p);
						break;
					}
				}
			}
		}

		//
		return result;
	}

}

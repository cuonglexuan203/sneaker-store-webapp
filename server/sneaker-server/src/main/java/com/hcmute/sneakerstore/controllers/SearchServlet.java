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
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.hibernate.internal.build.AllowSysOut;

import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.business.Sale;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.ValidationUtils;

@WebServlet("/search")
public class SearchServlet extends HttpServlet {

	private static final long serialVersionUID = -8352307117109040699L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		//
		String q = req.getParameter("q");
		String sortIn = req.getParameter("sort");
		String priceStr = req.getParameter("prices");
		String yearStr = req.getParameter("years");
		String genderStr = req.getParameter("genders");
		String kidStr = req.getParameter("kids");
		String colorStr = req.getParameter("colors");
		String saleStr = req.getParameter("sales");
		//
		List<Product> result = new ArrayList<>();
		// search
		List<Product> ps = ProductDao.selectMany();
		result = searchProducts(ps, q);

		// filter
		String splitStr = ",";
		if (!ValidationUtils.isNullOrEmpty(genderStr)) {
			String[] genders = { "men", "women" };
			result = filterByLabelQuery(result, genders, genderStr, splitStr, this::labelByCategories);
		}

		if (!ValidationUtils.isNullOrEmpty(priceStr)) {
			String[] defaultPriceRanges = { "0-99", "100-199", "200-299", "300-399", "400-499", "500-999999" };
			result = filterByLabelQuery(result, defaultPriceRanges, priceStr, splitStr, this::labelByPriceRanges);
		}

		if (!ValidationUtils.isNullOrEmpty(yearStr)) {
			String[] defaultYears = { "2018", "2019", "2020", "2021", "2022", "2023", "2024" };
			result = filterByLabelQuery(result, defaultYears, yearStr, splitStr, this::labelByYears);
		}

		if (!ValidationUtils.isNullOrEmpty(kidStr)) {
			String[] kids = { "younger boy", "younger girl" };
			result = filterByLabelQuery(result, kids, kidStr, splitStr, this::labelByCategories);
		}

		if (!ValidationUtils.isNullOrEmpty(colorStr)) {
			String[] colors = { "white", "black", "blue", "red", "purple", "yellow", "orange", "green", "pink", "brown",
					"gray" };
			result = filterByLabelQuery(result, colors, colorStr, splitStr, this::labelByColors);
		}

		if (!ValidationUtils.isNullOrEmpty(saleStr)) {
			String[] sales = { "FLASH_SALE", "BLACK_FRIDAY" };
			result = filterByLabelQuery(result, sales, saleStr, splitStr, this::labelBySale);
		}
		// sort
		if (!ValidationUtils.isNullOrEmpty(sortIn)) {
			if (sortIn.equalsIgnoreCase("asc")) {
				result = sortProducts(result, Comparator.comparing(Product::getPrice));
			} else if (sortIn.equalsIgnoreCase("desc")) {
				result = sortProducts(result, Comparator.comparing(Product::getPrice).reversed());
			} else if (sortIn.equalsIgnoreCase("newest")) {
				result = sortProducts(result, Comparator.comparing(Product::getReleaseDate).reversed());
			}
		}

		//
		HttpResponseHandler.sendSuccessJsonResponse(res, res.SC_OK, result);

	}

	private List<Product> filterByLabelQuery(List<Product> ps, String[] labels, String labelQuery, String splitStr,
			BiFunction<String[], Product, String> classifyByLabel) {
		if (ValidationUtils.isNullOrEmpty(ps)) {
			return ps;
		}
		if (ValidationUtils.isNullOrEmpty(labels)) {
			return List.of();
		}

		if (ValidationUtils.isNullOrEmpty(labelQuery)) {
			return ps;
		}

		if (classifyByLabel == null) {
			return List.of();
		}

		if (splitStr == null) {
			splitStr = "";
		}
		//
		List<Product> clonedPs = new ArrayList<>(ps); // shadow copy
		List<Product> result = new ArrayList<>();
		//
		if (!ValidationUtils.isNullOrEmpty(labelQuery)) {

			String[] defaultLabels = labels; // as client side
			//
			Set<String> filterdLabels = new HashSet<>(Arrays.asList(labelQuery.split(splitStr)));
			//
			Map<String, List<Product>> groupedProducts = groupProducts(clonedPs, defaultLabels, classifyByLabel);
			//
			for (String label : filterdLabels) {
				if (!ValidationUtils.isNullOrEmpty(label)) {
					//
					List<Product> labeledProducts = groupedProducts.getOrDefault(label, List.of());
					//
					for (int i = 0; i < clonedPs.size(); i++) {
						for (Product p : labeledProducts) {
							if (p.getId() == clonedPs.get(i).getId()) {
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

	private String labelByYears(String[] years, Product p) {

		String unlabeled = "";
		if (p == null || years == null) {
			return unlabeled;
		}
		//
		for (String year : years) {
			if (!ValidationUtils.isNullOrEmpty(year)) {
				if (Integer.parseInt(year) == p.getReleaseDate().getYear()) {
					return year;
				}
			}
		}

		return unlabeled;
	}

	private String labelBySale(String[] sales, Product p) {

		String unlabeled = "";
		if (p == null || sales == null) {
			return unlabeled;
		}
		//
		for (String sale : sales) {
			if (!ValidationUtils.isNullOrEmpty(sale)) {
				for(Sale s: p.getDiscountedSales()) {
					if(s.getType().toString().equalsIgnoreCase(sale)) {
						return sale;
					}
				}
			}
		}

		return unlabeled;
	}

	private String labelByColors(String[] colors, Product p) {

		String unlabeled = "";
		if (p == null || colors == null) {
			return unlabeled;
		}
		//
		for (String color : colors) {
			if (!ValidationUtils.isNullOrEmpty(color)) {
				for (ProductInventory pri : p.getProductInventories()) {
					if (pri.getColor().toString().equalsIgnoreCase(color)) {
						return color;
					}
				}
			}
		}

		return unlabeled;
	}

	private String labelByCategories(String[] categories, Product p) {

		String unlabeled = "";
		if (p == null || categories == null) {
			return unlabeled;
		}
		//
		for (String cate : categories) {
			for (String c : p.getCategories()) {
				if (cate.equalsIgnoreCase(c)) {
					return cate;
				}
			}
		}

		return unlabeled;
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
							if (p.getPrice() >= minPrice && p.getPrice() <= maxPrice) {
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

	private Map<String, List<Product>> groupProducts(List<Product> ps, String[] labels,
			BiFunction<String[], Product, String> classifyByLabel) {
		//
		Map<String, List<Product>> groupedProducts = Optional.ofNullable(ps).map(List::stream).orElseGet(Stream::empty)
				.collect(Collectors.groupingBy((p) -> {
					String label = classifyByLabel.apply(labels, p);
					return label;
				}));

		return groupedProducts;
	}

	private List<Product> sortProducts(List<Product> ps, Comparator<Product> comparator) {

		if (comparator == null) {
			return ps;
		}

		List<Product> clonedProducts = Optional.ofNullable(ps).map(List::stream).orElseGet(Stream::empty)
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
		String[] words = query.toLowerCase().split(" ");
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
				if (p.getName().toLowerCase().contains(word)) {
					result.add(p);
					continue;
				}

				if (word.contains(p.getName().toLowerCase())) {
					result.add(p);
				}
				//
				Set<String> cates = p.getCategories();
				Iterator<String> itor = cates.iterator();

				while (itor.hasNext()) {
					String caty = itor.next();

					if (caty.toLowerCase().contains(word)) {
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

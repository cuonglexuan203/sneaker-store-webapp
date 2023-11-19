package com.hcmute.sneakerstore.controllers;

import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.business.enums.Color;
import com.hcmute.sneakerstore.data.DAOs.CartDao;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@WebServlet("/testCartDao")
public class TestCartDaoServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/plain");
		StringBuilder output = new StringBuilder();

		try {
			// Test insertOne
			Cart newCart = Cart.builder()
					.build(); // Properly populate the new Cart object
			long newCartId = CartDao.insertOne(newCart);
			output.append("insertOne: Inserted cart with ID: ")
					.append(newCartId)
					.append("\n");

			// Test insertMany
			Cart newCart2 = Cart.builder()
					.build(); // Properly populate the new Cart object
			Cart newCart3 = Cart.builder()
					.build(); // Properly populate the new Cart object
			Cart newCart4 = Cart.builder()
					.build();
			Cart newCart5 = Cart.builder()
					.build();
			Cart newCart6 = Cart.builder()
					.build();
			long insertManyCount = CartDao.insertMany(Arrays.asList(newCart2,
					newCart3, newCart4, newCart5, newCart6));

			output.append("insertMany: Inserted count: ")
					.append(insertManyCount)
					.append("\n");

			// Test selectOne
			Cart cart = CartDao.selectOne(newCartId); // Use the ID from the
														// insert test

			output.append("selectOne: Selected cart with the following lineItem:")
					.append(cart.getLineItems().toString());
			output.append("selectOne: ")
					.append(cart != null ? cart.toString() : "No cart found")
					.append("\n");

			// Test selectMany
			List<Cart> carts = CartDao.selectMany();
			output.append("selectMany: ")
					.append(carts != null ? carts.toString() : "No carts found")
					.append("\n");

			// Test selectMany with IDs
			List<Long> ids = List.of(1l, 3l, 5l, 6l);
			List<Cart> cartsByIds = CartDao.selectMany(ids);
			output.append("selectManyByIds: ")
					.append(cartsByIds != null ? cartsByIds.toString()
							: "No carts found")
					.append("\n");

			// Test deleteOne
			long ok = CartDao.deleteOne(newCartId); // Use the ID from the
													// insert test
			output.append("deleteOne: ")
					.append(ok == 1 ? "Success" : "Failed")
					.append("\n");

			// Test deleteManyByIds
			if (!ids.isEmpty()) {
				long deleteManyByIdsCount = CartDao.deleteMany(ids);
				output.append("deleteManyByIds: Deleted ")
						.append(deleteManyByIdsCount)
						.append(" carts")
						.append("\n");
			}

			// Test deleteMany
			long deleteManyCount = CartDao.deleteMany();
			output.append("deleteMany: Deleted ")
					.append(deleteManyCount)
					.append(" carts")
					.append("\n");

		} catch (Exception e) {
			output.append("An error occurred: ")
					.append(e.getMessage());
		}

		response.getWriter()
				.print(output.toString());
	}
}

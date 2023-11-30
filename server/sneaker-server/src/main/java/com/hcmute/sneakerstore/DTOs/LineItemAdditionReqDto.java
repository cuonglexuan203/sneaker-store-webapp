package com.hcmute.sneakerstore.DTOs;

import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.model.enums.Color;

import lombok.Data;

@Data
public class LineItemAdditionReqDto {
	private Color color;
	private int size;
	private int quantity;
	private Product product;
	private long userId;

	public boolean isValid() {
		if (color == null || size <= 0 || quantity <= 0 || product == null || userId <= 0) {
			return false;
		}
		return true;
	}

	public LineItem getLineItem(UserDao userDao) {
		if (!isValid()) {
			return null;
		}
		//
		User user = userDao.findById(userId);
		if (user == null) {
			return null;
		}
		Cart cart = user.getCart();
		// Create new LineItem
		LineItem newLineItem = LineItem.builder().color(color).size(size).quantity(quantity).product(product).cart(cart)
				.build();
		return newLineItem;
	}
}

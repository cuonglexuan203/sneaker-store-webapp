package com.hcmute.sneakerstore.services;

import java.util.Iterator;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.CartDao;
import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.GenericDao;
import com.hcmute.sneakerstore.DAOs.LineItemDao;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.DTOs.LineItemAdditionReqDto;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.DBUtils;
import com.hcmute.sneakerstore.utils.HttpResponseHandler;
import com.hcmute.sneakerstore.utils.StatusMessage;

public class CartService {

	private CartDao cartDao;
	private UserDao userDao;
	private LineItemDao lineItemDao;

	public CartService() {
		cartDao = DaoFactory.getCartDao();
		userDao = DaoFactory.getUserDao();
		lineItemDao = DaoFactory.getLineItemDao();
	}

	public Cart getUserCart(long id) {
		User user = userDao.findById(id);
		if (user != null) {
			return user.getCart();
		}
		return null;
	}

	public boolean addLineItem(LineItemAdditionReqDto lineItemWrapper) {
		User user = userDao.findById(lineItemWrapper.getUserId());
		if (user == null) {
			return false;
		}
		Cart cart = user.getCart();
		Set<LineItem> lineItems = cart.getLineItems();
		Iterator<LineItem> iter = lineItems.iterator();
		LineItem lineItem = null;
		while (iter.hasNext()) {
			LineItem foo = iter.next();
			if (foo.getColor() == lineItemWrapper.getColor() && foo.getSize() == lineItemWrapper.getSize()
					&& foo.getProduct().getId() == lineItemWrapper.getProduct().getId()) {
				lineItem = foo;
				break;
			}
		}
		// if a existing line item
		if (lineItem != null) {
			lineItem.setQuantity(lineItem.getQuantity() + lineItemWrapper.getQuantity());
			// update lineItem
			lineItemDao.update(lineItem);
			return true;
		}

		// else
		// Create new line item
		LineItem newLineItem = lineItemWrapper.getLineItem(userDao);
		//
		if (newLineItem != null) {

			// persist lineItem
			long insertedLineItemId = lineItemDao.add(newLineItem);
			//

			if (insertedLineItemId != DBUtils.FAILED_ID) {
				return true;
			}

		}

		return false;
	}

	public boolean emptyCart(long userId) {
		User user = userDao.findById(userId);
		if (user != null) {
			Cart cart = user.getCart();
			cart.getLineItems().clear();
			cartDao.update(cart);
			
			return true;
		}
		return false;
	}
}

package com.hcmute.sneakerstore.services;

import com.hcmute.sneakerstore.DAOs.CartDao;
import com.hcmute.sneakerstore.DAOs.LineItemDao;
import com.hcmute.sneakerstore.DTOs.LineItemDelReqDto;
import com.hcmute.sneakerstore.DTOs.LineItemQtyUpdateReqDto;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.LineItem;

public class LineItemService {

	private CartDao cartDao;
	private LineItemDao lineItemDao;

	public LineItemService() {
		cartDao = new CartDao();
		lineItemDao = new LineItemDao();
	}

	public LineItem getLineItem(long id) {
		LineItem lineItem = lineItemDao.findById(id);
		if (lineItem != null) {
			return lineItem;
		}
		return null;
	}

	public boolean updateLineItemQuantity(LineItemQtyUpdateReqDto bodyObj) {
		long lineItemId = bodyObj.getLineItemId();
		int quantity = bodyObj.getQuantity();
		//
		if (lineItemId > 0 && quantity > 0) {
			LineItem lineItem = lineItemDao.findById(lineItemId);
			if (lineItem != null) {
				lineItem.setQuantity(quantity);
				LineItem updatedLineItem = lineItemDao.update(lineItem);
				if (updatedLineItem != null) {
					return true;
				}

			}
		}
		return false;
	}

	public boolean deleteLineItem(long id) {
		LineItem lineItem = lineItemDao.findById(id);
		if (lineItem != null) {
			Cart cart = lineItem.getCart();
			cart.removeLineItem(lineItem);
			cartDao.update(cart);
			return true;
		}
		return false;
	}

	public boolean deleteLineItems(LineItemDelReqDto deleteManyRequestBody) {
		long[] lineItemIds = deleteManyRequestBody.getLineItemIds();
		if (lineItemIds != null) {
			for (long l : lineItemIds) {
				if (l > 0) {
					LineItem lineItem = lineItemDao.findById(l);
					if (lineItem != null) {
						Cart cart = lineItem.getCart();
						cart.removeLineItem(lineItem);
						cartDao.update(cart);
					}
				}
			}

			return true;
		}
		return false;
	}
}

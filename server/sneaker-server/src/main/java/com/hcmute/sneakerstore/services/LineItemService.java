package com.hcmute.sneakerstore.services;

import com.hcmute.sneakerstore.DAOs.CartDao;
import com.hcmute.sneakerstore.DAOs.LineItemDao;
import com.hcmute.sneakerstore.DTOs.DeleteLineItemReqDto;
import com.hcmute.sneakerstore.DTOs.UpdateLineItemQtyReqDto;
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

	public boolean updateLineItemQuantity(UpdateLineItemQtyReqDto bodyObj) {
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
			// remove constraint(relationship)
			cart.removeLineItem(lineItem);
			cartDao.update(cart);
			lineItemDao.update(lineItem);
			// Delete lineItem
			lineItemDao.delete(id);
			return true;
		}
		return false;
	}

	public boolean deleteLineItems(DeleteLineItemReqDto deleteManyRequestBody) {
		long[] lineItemIds = deleteManyRequestBody.getLineItemIds();
		if (lineItemIds != null) {
			for (long l : lineItemIds) {
				if (l > 0) {
					LineItem lineItem = lineItemDao.findById(l);
					if (lineItem != null) {
						Cart cart = lineItem.getCart();
						// remove constraint(relationship)
						cart.removeLineItem(lineItem);
						cartDao.update(cart);
						lineItemDao.update(lineItem);
						// Delete lineItem
						lineItemDao.delete(l);
					}
				}
			}

			return true;
		}
		return false;
	}
}

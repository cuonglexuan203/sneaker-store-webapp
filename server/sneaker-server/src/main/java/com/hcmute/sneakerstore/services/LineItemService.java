package com.hcmute.sneakerstore.services;

import java.util.Iterator;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.CartDao;
import com.hcmute.sneakerstore.DAOs.LineItemDao;
import com.hcmute.sneakerstore.DTOs.DeleteLineItemReqDto;
import com.hcmute.sneakerstore.DTOs.UpdateLineItemQtyReqDto;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.ProductInventory;

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
				// check max count
				Product product = lineItem.getProduct();
				Set<ProductInventory> pis = product.getProductInventories();
				for (Iterator<ProductInventory> iter = pis.iterator(); iter.hasNext();) {
					ProductInventory pi = iter.next();
					if (lineItem.getColor() == pi.getColor()
							&& lineItem.getSize() == pi.getSize()) {
						int maxCount = pi.getProductAmount();
						if (quantity > maxCount) {
							return false;
						}
					}
				}
				//
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

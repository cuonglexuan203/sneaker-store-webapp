package com.hcmute.sneakerstore.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.CartDao;
import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.LineItemDao;
import com.hcmute.sneakerstore.DAOs.ProductDao;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.DTOs.AddLineItemReqDto;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.ProductInventory;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.utils.DBUtils;

public class CartService {
	
	private CartDao cartDao;
	private UserDao userDao;
	private LineItemDao lineItemDao;
	private ProductDao productDao;
	
	public CartService() {
		cartDao = DaoFactory.getCartDao();
		userDao = DaoFactory.getUserDao();
		lineItemDao = DaoFactory.getLineItemDao();
		productDao = DaoFactory.getProductDao();
	}
	
	public Cart getUserCart(long id) {
		User user = userDao.findById(id);
		if (user != null) {
			return user.getCart();
		}
		return null;
	}
	
	public boolean addLineItem(AddLineItemReqDto lineItemWrapper) {
		User user = userDao.findById(lineItemWrapper.getUserId());
		if (user == null) {
			return false;
		}
		//
		Cart cart = user.getCart();
		Set<LineItem> lineItems = cart.getLineItems();
		LineItem lineItem = null;
		// check whether the line item exists in the cart
		for (Iterator<LineItem> iter = lineItems.iterator(); iter.hasNext();) {
			LineItem foo = iter.next();
			if (foo.getColor() == lineItemWrapper.getColor()
					&& foo.getSize() == lineItemWrapper.getSize()
					&& foo	.getProduct()
							.getId() == lineItemWrapper	.getProduct()
														.getId()) {
				lineItem = foo;
				break;
			}
		}
		// max count in stock
		int maxCount = 0;
		Product product = productDao.findById(lineItemWrapper	.getProduct()
																.getId());
		if (product != null) {
			
			Set<ProductInventory> pis = product.getProductInventories();
			for (Iterator<ProductInventory> iter = pis.iterator(); iter.hasNext();) {
				ProductInventory tempPi = iter.next();
				if (lineItemWrapper.getColor() == tempPi.getColor()
						&& lineItemWrapper.getSize() == tempPi.getSize()) {
					maxCount = tempPi.getProductAmount();
					break;
				}
			}
		}
		
		// if a existing line item
		if (lineItem != null) {
			int num = lineItem.getQuantity() + lineItemWrapper.getQuantity();
			if (num > maxCount) {
				return false;
			}
			lineItem.setQuantity(num);
			// update lineItem
			lineItemDao.update(lineItem);
			return true;
		}
		
		// else
		// Create new line item
		if (lineItemWrapper.getQuantity() > maxCount) {
			return false;
		}
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
			List<Long> deletedIds = new ArrayList<>();
			Cart cart = user.getCart();
			for (Iterator<LineItem> iter = cart	.getLineItems()
												.iterator(); iter.hasNext();) {
				LineItem temp = iter.next();
				// remove relationship
				temp.setCart(null);
				lineItemDao.update(temp);
				//
				deletedIds.add(temp.getId());
			}
			// remove relationship
			cart.getLineItems()
				.clear();
			cartDao.update(cart);
			// delete line items
			lineItemDao.deleteMany(deletedIds);
			return true;
		}
		return false;
	}
}

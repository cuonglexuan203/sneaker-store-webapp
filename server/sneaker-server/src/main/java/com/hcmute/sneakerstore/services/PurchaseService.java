package com.hcmute.sneakerstore.services;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.InvoiceDao;
import com.hcmute.sneakerstore.DAOs.LineItemDao;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.Invoice;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Location;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.model.enums.PaymentStatus;

public class PurchaseService {
	private InvoiceDao invoiceDao;
	private UserDao userDao;
	private LineItemDao lineItemDao;

	public PurchaseService() {
		invoiceDao = DaoFactory.getInvoiceDao();
		userDao = DaoFactory.getUserDao();
		lineItemDao = DaoFactory.getLineItemDao();
	}

	public boolean purchase(long userId, List<LineItem> lineItems, Location address) {
		//
		User user = userDao.findById(userId);
		Cart cart = user.getCart();
		//
		Invoice invoice = createInvoice(lineItems, address);
		user.addInvoice(invoice);
		// Remove existing line items in cart
		Set<LineItem> cartLineItemSet = cart.getLineItems();
		//
		for (int i = 0; i < lineItems.size(); i++) {
			LineItem tempLineItem = lineItems.get(i);
			//
			for (Iterator<LineItem> itor = cartLineItemSet.iterator(); itor.hasNext();) {
				LineItem tempCartLineItem = itor.next();
				//
				if (tempCartLineItem.getSize() == tempLineItem.getSize()
						&& tempCartLineItem.getColor() == tempLineItem.getColor()
						&& tempCartLineItem.getQuantity() == tempLineItem.getQuantity()
						&& tempCartLineItem.getProduct().getId() == tempLineItem.getProduct().getId()) {
					itor.remove();
					break;
				}
			}
		}

		long id = invoiceDao.add(invoice);
		userDao.update(user);
		//
		if (id > 0) {
			return true;
		}
		return false;
	}

	public Invoice createInvoice(List<LineItem> lineItems, Location address) {
		//
		Invoice invoice = Invoice.builder().status(PaymentStatus.SUCCESS).paymentTime(LocalDateTime.now())
				.address(address).build();
		//
		for (Iterator<LineItem> iter = lineItems.iterator(); iter.hasNext();) {
			LineItem lineItem = iter.next();
			invoice.addLineItem(lineItem);
		}
		//
		return invoice;

	}
}

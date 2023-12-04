package com.hcmute.sneakerstore.services;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.InvoiceDao;
import com.hcmute.sneakerstore.DAOs.ProductDao;
import com.hcmute.sneakerstore.DAOs.UserDao;
import com.hcmute.sneakerstore.model.Cart;
import com.hcmute.sneakerstore.model.Invoice;
import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Location;
import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.ProductInventory;
import com.hcmute.sneakerstore.model.User;
import com.hcmute.sneakerstore.model.enums.PaymentStatus;
import com.hcmute.sneakerstore.utils.EmailSender;

public class PurchaseService {
	private InvoiceDao invoiceDao;
	private UserDao userDao;
	private ProductDao productDao;
	
	public PurchaseService() {
		invoiceDao = DaoFactory.getInvoiceDao();
		userDao = DaoFactory.getUserDao();
		productDao = DaoFactory.getProductDao();
	}
	
	public boolean purchase(long userId, List<LineItem> lineItems,
			Location address, String orderConfirmationPath) {
		//
		User user = userDao.findById(userId);
		Cart cart = user.getCart();
		//
		Invoice invoice = createInvoice(lineItems, address);
		user.addInvoice(invoice);
		//
		Set<LineItem> cartLineItemSet = cart.getLineItems();
		//
		for (int i = 0; i < lineItems.size(); i++) {
			LineItem tempLineItem = lineItems.get(i);
			// check for buy now feature ( new line item )
			if (tempLineItem.getId() > 0) {
				// Remove existing line items in cart
				for (Iterator<LineItem> itor = cartLineItemSet.iterator(); itor.hasNext();) {
					LineItem tempCartLineItem = itor.next();
					//
					if (tempCartLineItem.getId() == tempLineItem.getId()
							&& tempCartLineItem.getSize() == tempLineItem.getSize()
							&& tempCartLineItem.getColor() == tempLineItem.getColor()
							&& tempCartLineItem.getQuantity() == tempLineItem.getQuantity()
							&& tempCartLineItem	.getProduct()
												.getId() == tempLineItem.getProduct()
																		.getId()) {
						itor.remove();
						break;
					}
				}
			}
			
			// Decrease the appropriate quantity of product inventory
			
			long productId = tempLineItem	.getProduct()
											.getId();
			Product product = productDao.findById(productId);
			Set<ProductInventory> pis = product.getProductInventories();
			//
			for (Iterator<ProductInventory> iter = pis.iterator(); iter.hasNext();) {
				ProductInventory pi = iter.next();
				//
				if (pi.getColor() == tempLineItem.getColor()
						&& pi.getSize() == tempLineItem.getSize()) {
					int productAmount = pi.getProductAmount();
					int lineItemQuantity = tempLineItem.getQuantity();
					//
					if (productAmount >= lineItemQuantity) {
						pi.setProductAmount(productAmount - lineItemQuantity);
					} else {
						return false;
					}
				}
			}
			productDao.update(product);
		}
		long id = invoiceDao.add(invoice);
		userDao.update(user);
		//
		if (id > 0) {
			// Sending mail
			String from = "cuongit2003@gmail.com";
			String to = user.getEmail();
			String emailName = user.getFirstName() + " " + user.getLastName();
			String subject = "New order";
			String htmlText = getConfirmationHtml();
			EmailSender.sendHtmlMail(from, to, emailName, subject, htmlText);
			return true;
		}
		return false;
	}
	
	public Invoice createInvoice(List<LineItem> lineItems, Location address) {
		//
		Invoice invoice = Invoice	.builder()
									.status(PaymentStatus.SUCCESS)
									.paymentTime(LocalDateTime.now())
									.address(address)
									.build();
		//
		for (Iterator<LineItem> iter = lineItems.iterator(); iter.hasNext();) {
			LineItem lineItem = iter.next();
			invoice.addLineItem(lineItem);
		}
		//
		return invoice;
		
	}
	
	public String getConfirmationHtml() {
		String htmlText = "\r\n"
				+ "        <h2 class=\"capitalize font-semibold text-2xl text-green-600 p-4\">Thank you for your purchase</h2>\r\n"
				+ "        <p>Visit your <span class=\"text-green-500 capitalize\">account & billing </span> page to manage your invoices,\r\n"
				+ "            products, services.</p>\r\n"
				+ "        <p>If you have any questions, please contact us at <a href=\"mailto:sneakerstore@gmail.com\"\r\n"
				+ "                class=\"text-red-400\">sneakerstore@gmail.com</a>\r\n"
				+ "        </p>";
		return htmlText;
	}
}

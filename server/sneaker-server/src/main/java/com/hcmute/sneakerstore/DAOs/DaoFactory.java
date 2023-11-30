package com.hcmute.sneakerstore.DAOs;


public class DaoFactory {

	public static UserDao getUserDao() {
		return new UserDao();
	}

	public static AccountDao getAccountDao() {
		return new AccountDao();
	}

	public static CartDao getCartDao() {
		return new CartDao();
	}

	public static LineItemDao getLineItemDao() {
		return new LineItemDao();
	}

	public static SaleDao getSaleDao() {
		return new SaleDao();
	}

	public static ProductDao getProductDao() {
		return new ProductDao();
	}

	public static ProductInventoryDao getProductInventoryDao() {
		return new ProductInventoryDao();
	}

	public static InvoiceDao getInvoiceDao() {
		return new InvoiceDao();
	}

}

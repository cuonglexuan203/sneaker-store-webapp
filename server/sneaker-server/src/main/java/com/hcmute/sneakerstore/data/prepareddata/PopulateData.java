package com.hcmute.sneakerstore.data.prepareddata;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.reflect.TypeToken;
import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.Identifiable;
import com.hcmute.sneakerstore.business.Invoice;
import com.hcmute.sneakerstore.business.LineItem;
import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.business.Sale;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.data.DAOs.SaleDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.FileUtils;
import com.hcmute.sneakerstore.utils.GsonProvider;
import com.hcmute.sneakerstore.utils.PasswordVerification;

public class PopulateData {

	public static void main(String[] args) {

		String projectPath = System.getProperty("user.dir");
		String preparedDataPath = projectPath
				+ "/src/main/java/com/hcmute/sneakerstore/data/prepareddata/";
		List<String> fileName = Arrays.asList("accounts.json", "products.json",
				"productInventories.json", "users.json", "discountedSales.json",
				"lineItems.json", "invoices.json", "carts.json");

		//
		List<Type> types = Arrays.asList(new TypeToken<List<Account>>() {
		}.getType(), new TypeToken<List<Product>>() {
		}.getType(), new TypeToken<List<ProductInventory>>() {
		}.getType(), new TypeToken<List<User>>() {
		}.getType(), new TypeToken<List<Sale>>() {
		}.getType(), new TypeToken<List<LineItem>>() {
		}.getType(), new TypeToken<List<Invoice>>() {
		}.getType(), new TypeToken<List<Cart>>() {
		}.getType());
		//
		List<Account> accounts = new ArrayList<>();
		List<Product> products = new ArrayList<>();
		List<ProductInventory> productInventories = new ArrayList<>();
		List<User> users = new ArrayList<>();
		List<Sale> sales = new ArrayList<>();
		List<LineItem> lineItems = new ArrayList<>();
		List<Invoice> invoices = new ArrayList<>();
		List<Cart> carts = new ArrayList<>();

		List<List<? extends Identifiable>> collections = Arrays.asList(accounts,
				products, productInventories, users, sales, lineItems, invoices,
				carts);

		// Loading data
		for (int i = 0; i < fileName.size(); i++) {
			String fileContent = FileUtils
					.getFileContent(preparedDataPath + fileName.get(i));

			collections.get(i)
					.addAll(GsonProvider.getGsonInstance()
							.fromJson(fileContent, types.get(i)));

		}

		// Hashing password
		for (int i = 0; i < accounts.size(); i++) {
			Account acc = accounts.get(i);
			acc.setPassword(
					PasswordVerification.hashPassword(acc.getPassword()));
		}
		// Mapping

		for (int i = 0; i < products.size(); i++) {
			sales.get(i % 2)
					.addProduct(products.get(i));
			products.get(i)
					.addProductInventory(productInventories.get(i));

			products.get(i)
					.addLineItem(lineItems.get(i));
		}

		for (int i = 0; i < users.size(); i++) {

			users.get(i)
					.addAccount(accounts.get(i));
			users.get(i)
					.addCart(carts.get(i));

			users.get(i)
					.addInvoice(invoices.get(i));

			invoices.get(i)
					.addLineItem(lineItems.get(i));

			// Inconsistent
			carts.get(i)
					.addLineItem(lineItems.get(i));
		}

		// Persist into database
		ProductDao.insertMany(products);
		UserDao.insertMany(users);

	}
}

package com.hcmute.sneakerstore.data.prepareddata;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.reflect.TypeToken;
import com.hcmute.sneakerstore.business.Account;
import com.hcmute.sneakerstore.business.Cart;
import com.hcmute.sneakerstore.business.Product;
import com.hcmute.sneakerstore.business.ProductInventory;
import com.hcmute.sneakerstore.business.Sale;
import com.hcmute.sneakerstore.business.User;
import com.hcmute.sneakerstore.data.DAOs.ProductDao;
import com.hcmute.sneakerstore.data.DAOs.SaleDao;
import com.hcmute.sneakerstore.data.DAOs.UserDao;
import com.hcmute.sneakerstore.utils.FileUtils;
import com.hcmute.sneakerstore.utils.GsonProvider;

public class PopulateData {

	public static void main(String[] args) {
		String rootDataPath = "D:\\Workspace\\sneaker-store-webapp\\server\\sneaker-server\\src\\main\\java\\com\\hcmute\\sneakerstore\\data\\prepareddata\\";
		List<String> fileName = Arrays.asList("accounts.json", "products.json",
				"productInventories.json", "users.json",
				"discountedSales.json");
		
		//
		List<Type> types = Arrays.asList(new TypeToken<List<Account>>() {
		}.getType(), new TypeToken<List<Product>>() {
		}.getType(), new TypeToken<List<ProductInventory>>() {
		}.getType(), new TypeToken<List<User>>() {
		}.getType(), new TypeToken<List<Sale>>() {
		}.getType());
		//
		List<Account> accounts = null;
		List<Product> products = null;
		List<ProductInventory> productInventories = null;
		List<User> users = null;
		List<Sale> sales = null;
		List<Cart> carts = new ArrayList<>();

		for (int i = 0; i < fileName.size(); i++) {
			String fileContent = FileUtils
					.getFileContent(rootDataPath + fileName.get(i));

			switch (i) {
			case 0: {
				accounts = GsonProvider.getGsonInstance()
						.fromJson(fileContent, types.get(i));
				break;
			}
			case 1: {
				products = GsonProvider.getGsonInstance()
						.fromJson(fileContent, types.get(i));
				break;
			}
			case 2: {
				productInventories = GsonProvider.getGsonInstance()
						.fromJson(fileContent, types.get(i));
				break;
			}
			case 3: {
				users = GsonProvider.getGsonInstance()
						.fromJson(fileContent, types.get(i));
				break;
			}
			case 4: {
				sales = GsonProvider.getGsonInstance()
						.fromJson(fileContent, types.get(i));
				break;
			}

			}
		}

		for (int i = 0; i < 20; i++) {
			Cart foo = Cart.builder()
					.build();
			carts.add(foo);
		}

		// mapping
		for (int i = 0; i < 20; i++) {
			
			products.get(i).addProductInventory(productInventories.get(i));
			sales.get(i % 2).addProduct(products.get(i));
			users.get(i).addAccount(accounts.get(i));
			users.get(i).addCart(carts.get(i));
		}
		
		

		// persist into database
		ProductDao.insertMany(products);
		SaleDao.insertMany(sales);
		UserDao.insertMany(users);

	}
}

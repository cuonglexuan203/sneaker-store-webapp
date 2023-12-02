package com.hcmute.sneakerstore.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.ProductDao;
import com.hcmute.sneakerstore.DTOs.ProductResDto;
import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.utils.ValidationUtils;

public class AdminService {
	private ProductDao productDao;

	public AdminService() {
		productDao = DaoFactory.getProductDao();
	}

	public List<ProductResDto> getAllProducts() {

		List<Product> products = productDao.findAll();
		List<ProductResDto> adminProducts = new ArrayList<>();
		if(!ValidationUtils.isNullOrEmpty(products)) {
			
			//
			for(Iterator<Product> iter = products.iterator(); iter.hasNext();) {
				Product tempProduct = iter.next();
				ProductResDto tempAdminProduct = new ProductResDto();
				//
				tempAdminProduct.setProduct(tempProduct);
				tempAdminProduct.setProductInventories(tempProduct.getProductInventories());
				//
				adminProducts.add(tempAdminProduct);
			}
		}
		return adminProducts;
	}
}

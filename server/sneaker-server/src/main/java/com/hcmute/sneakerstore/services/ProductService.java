package com.hcmute.sneakerstore.services;

import java.util.List;

import com.hcmute.sneakerstore.DAOs.ProductDao;
import com.hcmute.sneakerstore.DTOs.ProductResDto;
import com.hcmute.sneakerstore.model.Product;

public class ProductService {
	private ProductDao productDao;

	public ProductService() {
		productDao = new ProductDao();
	}
	public List<Product> getAllProducts(){
		return productDao.findAll();
	}
	public ProductResDto getProductResDto(long productId) {
		Product product = productDao.findById(productId);
		//
		if (product != null) {
			ProductResDto productRes = new ProductResDto();
			productRes.setProduct(product);
			productRes.setProductInventories(product.getProductInventories());
			return productRes;
		}
		//
		return null;
	}
}

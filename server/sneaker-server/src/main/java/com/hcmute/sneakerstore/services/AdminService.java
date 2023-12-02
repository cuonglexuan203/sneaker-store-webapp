package com.hcmute.sneakerstore.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.hcmute.sneakerstore.DAOs.DaoFactory;
import com.hcmute.sneakerstore.DAOs.ProductDao;
import com.hcmute.sneakerstore.DAOs.ProductInventoryDao;
import com.hcmute.sneakerstore.DTOs.AddAdminProductReqDto;
import com.hcmute.sneakerstore.DTOs.ProductResDto;
import com.hcmute.sneakerstore.DTOs.UpdateAdminProductReqDto;
import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.ProductInventory;
import com.hcmute.sneakerstore.utils.ValidationUtils;

public class AdminService {
	private ProductDao productDao;
	private ProductInventoryDao productInventoryDao;

	public AdminService() {
		productDao = DaoFactory.getProductDao();
		productInventoryDao = DaoFactory.getProductInventoryDao();
	}

	public List<ProductResDto> getAllProducts() {

		List<Product> products = productDao.findAll();
		List<ProductResDto> adminProducts = new ArrayList<>();
		if (!ValidationUtils.isNullOrEmpty(products)) {

			//
			for (Iterator<Product> iter = products.iterator(); iter.hasNext();) {
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

	public boolean addProduct(AddAdminProductReqDto body) {
		Product newProduct = body.getProduct();
		List<ProductInventory> newProductInventories = body.getProductInventories();
		//
		if (newProduct != null && !ValidationUtils.isNullOrEmpty(newProductInventories)) {
			if (newProduct.getId() != 0) {
				newProduct.setId(0);
			}
			//
			for (Iterator<ProductInventory> iter = newProductInventories.iterator(); iter.hasNext();) {
				ProductInventory temp = iter.next();
				if (temp.getId() != 0) {
					temp.setId(0);
				}
				newProduct.addProductInventory(temp);
			}
			//
			long insertedNewProductId = productDao.add(newProduct);
			if (insertedNewProductId > 0) {
				return true;
			}
		}
		return false;
	}

	// only update one product inventory at a time
	public boolean updateProduct(UpdateAdminProductReqDto body) {
		Product updatedProduct = body.getProduct();
		long productInventoryId = body.getProductInventoryId();
		int quantity = body.getProductInventoryQty();
		//
		if (updatedProduct != null) {
			if (updatedProduct.getId() > 0) {
				Product managedProduct = productDao.findById(updatedProduct.getId());
				// copy properties
				managedProduct.setName(updatedProduct.getName());
				managedProduct.setBrand(updatedProduct.getBrand());
				managedProduct.setEan(updatedProduct.getEan());
				managedProduct.setPrice(updatedProduct.getPrice());
				managedProduct.setReleaseDate(updatedProduct.getReleaseDate());
				managedProduct.setCategories(updatedProduct.getCategories());
				managedProduct.setDescription(updatedProduct.getDescription());
				managedProduct.setImageUrl(updatedProduct.getImageUrl());
				//
				if (productInventoryId > 0) {
					Set<ProductInventory> productInventories = managedProduct.getProductInventories();
					for (Iterator<ProductInventory> iter = productInventories.iterator(); iter.hasNext();) {
						ProductInventory temp = iter.next();
						if (temp.getId() == productInventoryId) {
							temp.setProductAmount(quantity);
							break;
						}
					}
				}
				Product resultProduct = productDao.update(managedProduct);
				if (resultProduct != null) {
					return true;
				}
			}
		}
		return false;
	}

	public boolean deleteProductInventory(long id) {
		if (id > 0) {
			ProductInventory pi = productInventoryDao.findById(id);
			if (pi != null) {
				Product p = pi.getProduct();
				p.removeProductInventory(pi);
				Product updatedP = productDao.update(p);
				if (updatedP != null) {
					return true;
				}
			}
		}
		return false;
	}

}

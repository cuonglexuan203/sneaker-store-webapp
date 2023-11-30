package com.hcmute.sneakerstore.DTOs;

import java.util.Set;

import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.ProductInventory;

import lombok.Data;

@Data
public class ProductResDto {
	private Product product;
	private Set<ProductInventory> productInventories;
}

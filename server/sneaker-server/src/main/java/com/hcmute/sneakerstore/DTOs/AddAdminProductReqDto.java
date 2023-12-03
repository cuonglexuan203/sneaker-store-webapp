package com.hcmute.sneakerstore.DTOs;

import java.util.List;

import com.hcmute.sneakerstore.model.Product;
import com.hcmute.sneakerstore.model.ProductInventory;

import lombok.Data;

@Data
public class AddAdminProductReqDto {
	private Product product;
	private List<ProductInventory> productInventories;
}

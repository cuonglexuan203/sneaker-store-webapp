package com.hcmute.sneakerstore.DTOs;


import com.hcmute.sneakerstore.model.Product;

import lombok.Data;

@Data
public class UpdateAdminProductReqDto {
	private Product product;
	private long productInventoryId;
	private int productInventoryQty;
}

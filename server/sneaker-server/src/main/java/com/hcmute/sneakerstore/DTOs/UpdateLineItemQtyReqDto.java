package com.hcmute.sneakerstore.DTOs;

import lombok.Data;

@Data
public class UpdateLineItemQtyReqDto {
	private long lineItemId;
	private int quantity;
}

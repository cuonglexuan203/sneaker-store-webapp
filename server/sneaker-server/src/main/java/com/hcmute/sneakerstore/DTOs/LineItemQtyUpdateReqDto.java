package com.hcmute.sneakerstore.DTOs;

import lombok.Data;

@Data
public class LineItemQtyUpdateReqDto {
	private long lineItemId;
	private int quantity;
}

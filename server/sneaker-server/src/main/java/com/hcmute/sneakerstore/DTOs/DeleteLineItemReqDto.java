package com.hcmute.sneakerstore.DTOs;

import lombok.Data;

@Data
public class DeleteLineItemReqDto {
	private long[] lineItemIds;
}

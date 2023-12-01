package com.hcmute.sneakerstore.DTOs;

import java.util.List;

import com.hcmute.sneakerstore.model.LineItem;
import com.hcmute.sneakerstore.model.Location;

import lombok.Data;

@Data
public class PurchaseReqDto {
	private List<LineItem> lineItems;
	private String creditCardNumber;
	private String shippingEmail;
	private String cardHolder;
	private Location address;
	private long userId;
}

package com.hcmute.sneakerstore.business;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Embeddable
@AllArgsConstructor
public class Location {
	
	private String country;
	private String city;
	private String district;
	
	//
	
}

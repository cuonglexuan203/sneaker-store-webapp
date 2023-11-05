package com.hcmute.sneakerstore.business;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Location {
	
	private String country;
	private String city;
	private String district;
	
	//
}

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
	
//	@Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof Location)) return false;
//        Location that = (Location) o;
//        return Objects.equals(country, that.country) &&
//               Objects.equals(city, that.city) &&
//               Objects.equals(district, that.district);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(country, city, district);
//    }
}

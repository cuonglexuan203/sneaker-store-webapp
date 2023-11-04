package com.hcmute.sneakerstore.business;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "SALES")
public class Sale {

	public enum SaleType {
		FLASH_SALE, 
		BLACK_FRIDAY,
	}

	@Id
	@GeneratedValue
	private int id;

	@NotNull
	private SaleType type = SaleType.FLASH_SALE;

	@NotNull
	private float percentage;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	private Set<Product> products;

}

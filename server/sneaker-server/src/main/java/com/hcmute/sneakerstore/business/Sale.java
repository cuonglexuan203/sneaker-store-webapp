package com.hcmute.sneakerstore.business;

import java.util.Set;

import com.hcmute.sneakerstore.business.enums.SaleType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "SALES")
public class Sale {

	@Id
	@GeneratedValue
	private int id;

	@NotNull
	private SaleType type = SaleType.FLASH_SALE;

	@NotNull
	private float percentage = 0.f;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	private Set<Product> products;
	
	//
	
	public Sale(SaleType type, float percentage) {
		this.type = type;
		this.percentage = percentage;
	}
	
	public void addProduct(Product product) {
		products.add(product);
		product.getSales().add(this);
	}
	
	public void removeProduct(Product product) {
		products.remove(product);
		product.getSales().remove(this);
	}
	
	//
	
	public int getSaleProductCount() {
		return products.size();
	}
}

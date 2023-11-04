package com.hcmute.sneakerstore.business;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name="SALESOFF")
public @Data class SalesOff{
	@Id
	@ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

	@Id
    @ManyToOne
    @JoinColumn(name = "sales_id")
    private Sales sales;


	public SalesOff() {
	
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	
}
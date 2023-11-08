package com.hcmute.sneakerstore.business;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name = "SALES")
public @Data class Sales {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int sales_id;

	private String type;

	private float percentage;

	@ManyToMany(mappedBy = "products")
	private Set<Product> products;

	// Constructors, getters, and setters
	public Sales() {

	}

	public int getSales_id() {
		return sales_id;
	}

	public void setSales_id(int sales_id) {
		this.sales_id = sales_id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Set<Product> getProducts() {
		return products;
	}

	public void setSales_id(Set<Product> products) {
		this.products = products;
	}

}

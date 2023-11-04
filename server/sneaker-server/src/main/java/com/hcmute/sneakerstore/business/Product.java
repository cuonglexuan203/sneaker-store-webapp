package com.hcmute.sneakerstore.business;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "PRODUCT")
public class Product {

	@Id
	private int id;

	@NotNull
	private String brand;

	@NaturalId
	@NotNull
	private String ean;

	@NotNull
	private float price;

	@NotNull
	@Column(name = "date_added")
	private LocalDate dateAdded = LocalDate.now();

	@NotNull
	@Column(name = "date_updated")
	private LocalDate dateUpdated = LocalDate.now();

	private List<String> categories;

	private String description;

	@Column(name = "image_url")
	@NotNull
	private String imageUrl;
	
	//

	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<LineItem> lineItems;

	@ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
	private Set<Sale> sales;
	
	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductInventory> productInventories;

}

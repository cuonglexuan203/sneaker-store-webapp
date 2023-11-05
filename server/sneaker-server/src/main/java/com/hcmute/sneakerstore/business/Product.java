package com.hcmute.sneakerstore.business;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
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
	@GeneratedValue
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

	private Set<String> categories;

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
	
	//
	
	public void addLineItem(LineItem lineItem) {
		lineItems.add(lineItem);
		lineItem.setProduct(this);
	}
	
	public void removeLineItem(LineItem lineItem) {
		lineItems.remove(lineItem);
		lineItem.setProduct(null);
	}
	
	public void addProductInventory(ProductInventory productInventory) {
		productInventories.add(productInventory);
		productInventory.setProduct(this);
	}
	
	public void removeProductInventory(ProductInventory productInventory) {
		productInventories.remove(productInventory);
		productInventory.setProduct(null);
	}
	
	//
	
	public float calcSalePrice(Sale sale) {
		return price * sale.getPercentage();
	}
	
	public void addCategory(String category) {
		categories.add(category);
	}
	
	public void removeCategory(String category) {
		categories.removeIf(s -> s.equalsIgnoreCase(category));
	}
	
	public void addCategories(List<String> categories) {
		this.categories.addAll(categories);
	}
	
	public void removeCategories(List<String> categories) {
		this.categories.removeIf(s -> categories.contains(s));
	}
	
	public int getProductCount() {
		int count = 0;
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		while(iter.hasNext()) {
			
		}
	}
}

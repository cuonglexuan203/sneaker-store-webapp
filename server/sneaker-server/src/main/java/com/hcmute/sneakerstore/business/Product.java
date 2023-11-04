package com.hcmute.sneakerstore.business;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name="PRODUCT")
public @Data class Product{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int product_id;
	
	private String brand;
	
	private String ean;
	
	private String price;
	
	private Date date_added ;
	
	private Date date_updated;
	
	private String categories;
	
	private String description;
	
	private String image_url;
	
	//Relationship with Sales
	@OneToMany(
			mappedBy = "product",
			cascade = CascadeType.ALL,
			orphanRemoval = true
		)

	private Set<SalesOff> salesoff;
	
	//Relationship with Cart
	@OneToMany(
			mappedBy = "product",
			cascade = CascadeType.ALL,
			orphanRemoval = true
		)
	private Set<LineItem> lineitems;

	//Relationship with Invoice
	@OneToMany(
			mappedBy = "product",
			cascade = CascadeType.ALL,
			orphanRemoval = true
		)
    private Set<ProductInvoice> productInvoice;
	
	//Relationship with Color and Size
	@OneToMany(
			mappedBy = "product", 
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private Set<Storage> storage;

	public Product() {
		
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getEan() {
		return ean;
	}

	public void setEan(String ean) {
		this.ean = ean;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public Date getDate_added() {
		return date_added;
	}

	public void setDate_added(Date date_added) {
		this.date_added = date_added;
	}

	public Date getDate_updated() {
		return date_updated;
	}

	public void setDate_updated(Date date_updated) {
		this.date_updated = date_updated;
	}

	public String getCategories() {
		return categories;
	}

	public void setCategories(String categories) {
		this.categories = categories;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}


	public Set<Storage> getStorage() {
		return storage;
	}

	public void setStorage(Set<Storage> storage) {
		this.storage = storage;
	}

}

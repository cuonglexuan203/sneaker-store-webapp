package com.hcmute.sneakerstore.business;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import com.hcmute.sneakerstore.business.enums.Color;
import com.hcmute.sneakerstore.utils.CollectionUtils;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Singular;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "PRODUCT")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	private String brand;

	@NotNull
	private String name;

	
	@EqualsAndHashCode.Include
	@NaturalId
	@NotNull
	private String ean;

	@Builder.Default
	@NotNull
	private float price = 0;

	@Builder.Default
	@NotNull
	@Column(name = "date_added")
	private LocalDate dateAdded = LocalDate.now();

	@Builder.Default
	@NotNull
	@Column(name = "date_updated")
	private LocalDate dateUpdated = LocalDate.now();

	@Singular
	private Set<String> categories;

	private String description;

	@NotNull
	@Column(name = "image_url")
	private String imageUrl;

	//

	@Builder.Default
	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<LineItem> lineItems = new HashSet<>();

	@Builder.Default
	@ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
	private Set<Sale> discountedSales = new HashSet<>();

	@Builder.Default
	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductInventory> productInventories = new HashSet<>();

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

	public float getSalePrice(Sale sale) {
		float ratio = sale == null ? 1.f : sale.getPercentage();
		return price * ratio;
	}

	public float getSalePrice() {
		return getSalePrice(getHighestSale());
	}

	public Sale getHighestSale() {
		if (this.discountedSales == null || this.discountedSales.isEmpty()) {
			return null;
		}

		Iterator<Sale> iter = this.discountedSales.iterator();
		Sale highestSale = iter.next();
		while (iter.hasNext()) {
			Sale temp = iter.next();
			if (highestSale.getPercentage() < temp.getPercentage()) {
				highestSale = temp;
			}
		}
		return highestSale;
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

	public int getAllProductCount() {
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		return (int) CollectionUtils.<ProductInventory>aggregate(iter, (acc, i) -> acc + i.getProductAmount());
	}

	public int getProductCountByColor(Color c) {
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		return (int) CollectionUtils.<ProductInventory>aggregate(iter,
				(acc, i) -> (i.getColor() == c ? acc + i.getProductAmount() : acc));
	}

	public int getProductCountBySize(int size) {
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		return (int) CollectionUtils.<ProductInventory>aggregate(iter,
				(acc, i) -> (i.getSize() == size ? acc + i.getProductAmount() : acc));
	}

	

}

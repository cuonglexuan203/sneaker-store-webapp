package com.hcmute.sneakerstore.business;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import com.hcmute.sneakerstore.business.enums.Color;
import com.hcmute.sneakerstore.utils.CollectionUtils;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

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
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "PRODUCT")
public class Product implements Serializable, Identifiable {

	
	private static final long serialVersionUID = -7328997558903962833L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

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
	@Column(name = "release_date")
	private LocalDate releaseDate = LocalDate.now();

	@Singular
	private Set<String> categories;

	private String description;

	@NotNull
	@Column(name = "image_url")
	private String imageUrl;

	//
	@GsonExclude
	@ToString.Exclude
	@Builder.Default
	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<LineItem> lineItems = new HashSet<>();

	@GsonExclude
	@ToString.Exclude
	@Builder.Default
	@ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
	private Set<Sale> discountedSales = new HashSet<>();

	@GsonExclude
	@ToString.Exclude
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
		if (this.categories == null) {
			this.categories = new HashSet<>();
		}
		categories.add(category);
	}

	public void removeCategory(String category) {
		if (this.categories == null) {
			return;
		}
		categories.removeIf(s -> s.equalsIgnoreCase(category));
	}

	public void addCategories(List<String> categories) {
		if (this.categories == null) {
			this.categories = new HashSet<>();
		}
		this.categories.addAll(categories);
	}

	public void removeCategories(List<String> categories) {
		if (this.categories == null) {
			return;
		}
		this.categories.removeIf(s -> categories.contains(s));
	}

	public int getAllProductCount() {
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		return (int) CollectionUtils.<ProductInventory>aggregate(iter,
				(acc, i) -> acc + i.getProductAmount());
	}

	public int getProductCountByColor(Color c) {
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		return (int) CollectionUtils.<ProductInventory>aggregate(iter, (acc,
				i) -> (i.getColor() == c ? acc + i.getProductAmount() : acc));
	}

	public int getProductCountBySize(int size) {
		Iterator<ProductInventory> iter = this.productInventories.iterator();
		return (int) CollectionUtils.<ProductInventory>aggregate(iter, (acc,
				i) -> (i.getSize() == size ? acc + i.getProductAmount() : acc));
	}

}

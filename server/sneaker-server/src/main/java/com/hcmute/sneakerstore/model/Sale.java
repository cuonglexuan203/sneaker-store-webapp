package com.hcmute.sneakerstore.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.hcmute.sneakerstore.model.enums.SaleType;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SALE")
public class Sale implements Serializable, Identifiable {

	private static final long serialVersionUID = -2842787509443180196L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Builder.Default
	@NotNull
	private SaleType type = SaleType.FLASH_SALE;

	@Builder.Default
	@NotNull
	private float percentage = 1.f;

	//
	@EqualsAndHashCode.Exclude
	@GsonExclude
	@ToString.Exclude
	@Builder.Default
	@ManyToMany(cascade = CascadeType.ALL)
	private Set<Product> products = new HashSet<>();

	//

	public Sale(SaleType type, float percentage) {
		this.type = type;
		this.percentage = percentage;
	}

	public void addProduct(Product product) {
		products.add(product);
		product.getDiscountedSales()
				.add(this);
	}

	public void removeProduct(Product product) {
		products.remove(product);
		product.getDiscountedSales()
				.remove(this);
	}

	//

	public int getSaleProductCount() {
		return products.size();
	}
}

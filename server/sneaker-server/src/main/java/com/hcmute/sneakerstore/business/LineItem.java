package com.hcmute.sneakerstore.business;

import java.io.Serializable;

import com.hcmute.sneakerstore.business.enums.Color;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "LINEITEM")
public class LineItem implements Serializable, Identifiable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3950211052516485067L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Builder.Default
	@NotNull
	private Color color = Color.BLACK;

	@NotNull
	private int size;

	@Builder.Default
	@NotNull
	private int quantity = 0;

	//
	@GsonExclude
	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "invoice_id")
	private Invoice invoice;
	
	@GsonExclude
	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "cart_id")
	private Cart cart;
	
	@GsonExclude
	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	//

	public LineItem(Color color, int size, int quantity) {
		this.color = color;
		this.size = size;
		this.quantity = quantity;
	}

	//

	public float getLineItemPrice() {
		return this.getQuantity() * this.product.getPrice();
	}

	public float getSaleLineItemPrice() {
		return this.getQuantity() * 1.f * this.product.getSalePrice();
	}

}
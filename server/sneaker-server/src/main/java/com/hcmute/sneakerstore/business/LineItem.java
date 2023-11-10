package com.hcmute.sneakerstore.business;



import com.hcmute.sneakerstore.business.enums.Color;

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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "LINEITEM")
public class LineItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Builder.Default
	@NotNull
	private Color color = Color.BLACK;

	@NotNull
	private int size;

	@Builder.Default
	@NotNull
	private int quantity = 0;

	//

	@ManyToOne
	@JoinColumn(name = "invoice_id")
	private Invoice invoice;

	@ManyToOne
	@JoinColumn(name = "cart_id")
	private Cart cart;

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
package com.hcmute.sneakerstore.business;

import com.hcmute.sneakerstore.business.enums.Color;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name="PRODUCT_INVENTORY")
public class ProductInventory {

	@Id
	@GeneratedValue
	private int id;
	
	@NotNull
	@Column(name="product_amount")
	private int productAmount = 0;
	
	@NotNull
	private Color color = Color.BLACK;
	
	@NotNull
	private int size;
	
	//
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	//
	
	public ProductInventory(int productAmount, Color color, int size) {
		this.productAmount = productAmount;
		this.color = color;
		this.size = size;
	}
	
}

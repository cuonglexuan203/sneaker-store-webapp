package com.hcmute.sneakerstore.model;

import java.io.Serializable;

import com.hcmute.sneakerstore.model.enums.Color;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.persistence.Column;
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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCT_INVENTORY")
public class ProductInventory implements Serializable, Identifiable {
	
	private static final long serialVersionUID = -830725538291796429L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Builder.Default
	@NotNull
	@Column(name = "product_amount")
	private int productAmount = 0;

	@Builder.Default
	@NotNull
	private Color color = Color.BLACK;

	@NotNull
	private int size;

	//

	@EqualsAndHashCode.Exclude
	@GsonExclude
	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	//

}
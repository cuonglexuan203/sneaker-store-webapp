package com.hcmute.sneakerstore.business;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.hcmute.sneakerstore.utils.CollectionUtils;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "CART")
public class Cart implements Serializable, Identifiable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1936956525338503426L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	//
	@GsonExclude
	@ToString.Exclude
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ToString.Exclude
	@Builder.Default
	@OneToMany(mappedBy = "cart", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<LineItem> lineItems = new HashSet<>();

	//

	public void addLineItem(LineItem lineItem) {
		lineItems.add(lineItem);
		lineItem.setCart(this);
	}

	public void removeLineItem(LineItem lineItem) {
		lineItems.remove(lineItem);
		lineItem.setCart(null);
	}

	//

	public int getItemCount() {
		return lineItems.size();
	}

	public float getTotalPrice() {
		return CollectionUtils.aggregate(this.lineItems.iterator(),
				(acc, i) -> acc + i.getLineItemPrice());
	}

	public float getTotalSalePrice() {
		return CollectionUtils.aggregate(this.lineItems.iterator(),
				(acc, i) -> acc + i.getSaleLineItemPrice());
	}

}
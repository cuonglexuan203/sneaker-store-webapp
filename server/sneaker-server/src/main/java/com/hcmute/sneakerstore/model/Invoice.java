package com.hcmute.sneakerstore.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.hcmute.sneakerstore.model.enums.DeliveryStatus;
import com.hcmute.sneakerstore.model.enums.PaymentStatus;
import com.hcmute.sneakerstore.utils.CollectionUtils;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "INVOICE")
public class Invoice implements Serializable, Identifiable {

	
	private static final long serialVersionUID = 7781909304560806023L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Builder.Default
	@NotNull
	private PaymentStatus status = PaymentStatus.WAITING_FOR_PAYMENT;

	@NotNull
	@Column(name = "payment_time")
	private LocalDateTime paymentTime;

	@NotNull
	private Location address;

	@Builder.Default
	@NotNull
	@Column(name = "delivery_status")
	private DeliveryStatus deliveryStatus = DeliveryStatus.PENDING;

	@Column(name = "total_amount")
	private float totalAmount;

	//

	// User
	@EqualsAndHashCode.Exclude
	@GsonExclude
	@ToString.Exclude
	@ManyToOne
	@JoinColumn(name = "user_id", foreignKey = @jakarta.persistence.ForeignKey(name = "USER_ID_FK"))
	private User user;

	// LineItem
	@Builder.Default
	@OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
	private Set<LineItem> lineItems = new HashSet<>();

	//

	public void addLineItem(LineItem lineItem) {
		lineItems.add(lineItem);
		lineItem.setInvoice(this);
		this.totalAmount += lineItem.getLineItemPrice();
	}

	public void removeLineItem(LineItem lineItem) {
		lineItems.remove(lineItem);
		lineItem.setInvoice(null);
		// Validate for the existence
		this.totalAmount -= lineItem.getLineItemPrice();
	}

	//
	public float getTotalPrice() {
		return CollectionUtils.<LineItem>aggregate(this.getLineItems()
				.iterator(), (acc, i) -> acc + i.getLineItemPrice());
	}

	public float getTotalSalePrice() {
		return CollectionUtils.<LineItem>aggregate(this.getLineItems()
				.iterator(), (acc, i) -> acc + i.getSaleLineItemPrice());
	}

}
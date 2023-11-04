package com.hcmute.sneakerstore.business;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "INVOICE")
public class Invoice {

	public enum PaymentStatus {
		SUCCESS, CANCEL, WAITING_FOR_PAYMENT, PAYMENT_EXPIRY,
	}

	public enum DeliveryStatus {
		PENDING, IN_TRANSIT, SHIPPED, CANCELLED
	}

	@Id
	@GeneratedValue
	private int id;

	@NotNull
	private PaymentStatus status = PaymentStatus.WAITING_FOR_PAYMENT;

	@NotNull
	@Column(name = "payment_time")
	private LocalDateTime paymentTime;

	@NotNull
	private Location address;

	@NotNull
	@Column(name = "delivery_status")
	private DeliveryStatus deliveryStatus = DeliveryStatus.PENDING;

	@Column(name = "total_amount")
	private float totalAmount;

	// User
	@ManyToOne
	@JoinColumn(name = "user_id", foreignKey = @jakarta.persistence.ForeignKey(name = "USER_ID_FK"))
	private User user;

	// LineItem
	@OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<LineItem> lineItems;

}
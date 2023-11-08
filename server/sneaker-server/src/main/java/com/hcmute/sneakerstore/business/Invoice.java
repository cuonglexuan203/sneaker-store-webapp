package com.hcmute.sneakerstore.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name = "INVOICE")
public @Data class Invoice {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String invoice_id;

	@Column(name = "status")
	private String status;

	@Column(name = "invoice_date")
	private Date invoiceDate;

	@Column(name = "address")
	private String address;

	@Column(name = "delivery_status")
	private String deliveryStatus;

	@Column(name = "total_amount")
	private float totalAmount;

	// Associations

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id") // Khóa ngoại: user_id
	private User user;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "INVOICE")
	@JoinColumn(name = "product_id") // Khóa ngoại: product_id
	private Set<LineItem> lineItems;

	// Constructors, getters, and setters
	public Invoice() {

	}

	public String getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(String invoice_id) {
		this.invoice_id = invoice_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getInvoice_date() {
		return invoiceDate;
	}

	public void setInvoice_date(Date invoice_date) {
		this.invoiceDate = invoice_date;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDelivery_status() {
		return deliveryStatus;
	}

	public void setDelivery_status(String delivery_status) {
		this.deliveryStatus = delivery_status;
	}

	public Float getTotal_amount() {
		return totalAmount;
	}

	public void setTotal_amount(Float total_amount) {
		this.totalAmount = total_amount;
	}

}
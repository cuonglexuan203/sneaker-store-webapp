package com.hcmute.sneakerstore;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
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
@Table(name="INVOICE")
public @Data class Invoice{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int invoice_id;
	
	//Relationship with User
	@ManyToOne
	@JoinColumn(name = "user_id",
			foreignKey = @jakarta.persistence.ForeignKey(name = "USER_ID_FK")
	)
	private User user;

	
	private String status;
	
	@Temporal (jakarta.persistence.TemporalType.DATE)
	private Date invoice_date;
	
	private String address;
	
	private String delivery_status;
	
	private Float total_amount;
	
	//Relationship with Product
	@OneToMany(
			mappedBy = "invoice",
			cascade = CascadeType.ALL,
			orphanRemoval = true
		)
    private Set<ProductInvoice> productInvoice;
	
		
	
	public Invoice() {
		
	}

	public int getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(int invoice_id) {
		this.invoice_id = invoice_id;
	}


	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getInvoice_date() {
		return invoice_date;
	}

	public void setInvoice_date(Date invoice_date) {
		this.invoice_date = invoice_date;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDelivery_status() {
		return delivery_status;
	}

	public void setDelivery_status(String delivery_status) {
		this.delivery_status = delivery_status;
	}

	public Float getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(Float total_amount) {
		this.total_amount = total_amount;
	}

	
}
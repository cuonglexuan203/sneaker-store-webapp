package com.hcmute.sneakerstore.business;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "USER")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private int id;
	
	@NotNull
	@Column(name="first_name")
	private String firstName;
	
	@NotNull
	@Column(name="last_name")
	private String lastName;

	private String email;

	// 0: male, 1: female
	@NotNull
	private Boolean gender = false;
	
	@NotNull
	private LocalDate birthday = LocalDate.now();
	
	@NotNull
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@NotNull
	@Embedded
	private Location address;

	// => convert to embeddable values
	@Column(name = "credit_card_type")
	private String creditCardType;

	@Column(name = "credit_card_number")
	private String creditCardNumber;

	//
	
	// Invoice
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Invoice> invoices;

	// Cart
	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Cart cart;

	// Account
	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Account account;
	
	//
	
	public void addInvoice(Invoice invoice) {
		invoices.add(invoice);
		invoice.setUser(this);
	}
	
	public void removeInvoice(Invoice invoice) {
		invoices.remove(invoice);
		invoice.setUser(null);
	}
	
	public void addCart(Cart cart) {
		this.setCart(cart);
		cart.setUser(this);
	}
	
	public void removeCart(Cart cart) {
		this.setCart(null);
		cart.setUser(null);
	}
	
	public void addAccount(Account account) {
		this.setAccount(account);
		account.setUser(this);
	}
	
	public void removeAccount(Account account) {
		this.setAccount(null);
		account.setUser(null);
	}

}
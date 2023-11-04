package com.hcmute.sneakerstore.business;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "USER")
public class User {

	@Id
	@GeneratedValue
	@Column(name = "user_id")
	private int userId;
	
	@NotNull
	private String firstname;
	
	@NotNull
	private String lastname;

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

	// Invoice //
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Invoice> invoices;

	// Cart
	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Cart cart;

	// Account
	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Account account;

}
package com.hcmute.sneakerstore.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.NaturalId;

import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

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
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "USER")
public class User implements Serializable, Identifiable {

	private static final long serialVersionUID = 3211725346777768171L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull
	@Column(name = "first_name")
	private String firstName;

	@NotNull
	@Column(name = "last_name")
	private String lastName;

	private String email;

	// 0: male, 1: female
	@Builder.Default
	@NotNull
	private Boolean gender = false;

	@NotNull
	@Builder.Default
	private LocalDate birthday = LocalDate.now();

	@NaturalId
	@NotNull
	@Column(name = "phone_number")
	private String phoneNumber;

	@NotNull
	@Embedded
	private Location address;
	
	@Builder.Default
	@Column(name = "avatar")
	private String imageUrl = "/images/auth/unknown_user.jpg";

	// => convert to embeddable values
	@Column(name = "credit_card_type")
	private String creditCardType;

	@Column(name = "credit_card_number")
	private String creditCardNumber;

	//

	// Invoice
	@GsonExclude
	@ToString.Exclude
	@Builder.Default
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Invoice> invoices = new HashSet<>();

	// Cart
	@GsonExclude
	@ToString.Exclude
	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Cart cart;

	// Account
	@GsonExclude
	@ToString.Exclude
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

	//
	
}
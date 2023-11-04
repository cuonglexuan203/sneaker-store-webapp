package com.hcmute.sneakerstore.business;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name="USER")
public @Data class User{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int user_id;
	
	private String firstname;
	
	private String lastname;
	
	private String email;
	
	private Boolean genger;
	
	private String phone_number;
	
	private String address;
	
	private String credit_card_type;
	
	private String credit_card_number;
	
	//Relationship with Invoice
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Invoice> invoices;
	
	//Relationship with Cart
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
	
	//Relationship with Account
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Account account;
	
	public User() {
		
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getGenger() {
		return genger;
	}

	public void setGenger(Boolean genger) {
		this.genger = genger;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCredit_card_type() {
		return credit_card_type;
	}

	public void setCredit_card_type(String credit_card_type) {
		this.credit_card_type = credit_card_type;
	}

	public String getCredit_card_number() {
		return credit_card_number;
	}

	public void setCredit_card_number(String credit_card_number) {
		this.credit_card_number = credit_card_number;
	}

	public Set<Invoice> getInvoices() {
		return invoices;
	}

	public void setInvoices(Set<Invoice> invoices) {
		this.invoices = invoices;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	
}
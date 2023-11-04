package com.hcmute.sneakerstore.business;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name="CART")
public @Data class Cart{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int cart_id;
	
	@OneToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	
	//Relationship with Product
	@OneToMany(
			mappedBy = "cart",
			cascade = CascadeType.ALL,
			orphanRemoval = true
		)
	private Set<LineItem> lineitems;

	
	
	public Cart() {
		
	}


	public int getCart_id() {
		return cart_id;
	}


	public void setCart_id(int cart_id) {
		this.cart_id = cart_id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}

	
	
}
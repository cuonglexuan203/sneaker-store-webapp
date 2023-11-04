package com.hcmute.sneakerstore.business;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="CART")
public  class Cart{
	
	@Id
	@GeneratedValue
	private int cart_id;
	
	@OneToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	
	@OneToMany(
			mappedBy = "cart",
			cascade = CascadeType.ALL,
			orphanRemoval = true
		)
	private Set<LineItem> lineitems;

	
	
	
}
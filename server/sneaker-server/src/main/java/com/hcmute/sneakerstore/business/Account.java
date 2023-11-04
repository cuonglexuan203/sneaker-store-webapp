package com.hcmute.sneakerstore.business;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name="ACCOUNT")
public class Account{
	
	enum Role{
		ADMIN,
		USER,
	}
	
	@Id
	@GeneratedValue
	private String id;
	
	@NotNull
	private String username;
	
	@NotNull
	private String password;
	
	@NotNull
	private Role role = Role.USER;
	//
	@OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
	
}
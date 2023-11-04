package com.hcmute.sneakerstore;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Entity
@Table(name="USERROLE")
public @Data class UserRole{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@OneToOne (fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name = "username")
	private Account account;

	public enum Role {
	    ADMIN,
	    USER,
	    GUEST
	}

	@Column(name="role")
    private Role role;
	
	public UserRole() {
		
	}

	
	public Account getAccount() {
		return account;
	}


	public void setAccount(Account account) {
		this.account = account;
	}


	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	
	
	
}
package com.hcmute.sneakerstore.business;

import java.util.Objects;

import org.hibernate.annotations.NaturalId;

import com.hcmute.sneakerstore.business.enums.Role;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "ACCOUNT")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@NaturalId
	private String username;

	@NotNull
	private String password;

	@NotNull
	private Role role = Role.USER;

	//

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;

	//

	public Account(String username, String password, Role role) {
		this.username = username;
		this.password = password;
		this.role = role;
	}
	
	@Override
	public boolean equals(Object o) {
		if(this == o) return true;
		if(o == null || getClass() != o.getClass()) return false;
		Account that = (Account) o;
		return Objects.equals(username, that.username);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(username);
	}
}
package com.hcmute.sneakerstore.model;

import java.io.Serializable;

import org.hibernate.annotations.NaturalId;

import com.hcmute.sneakerstore.model.enums.Role;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Entity
@Table(name = "ACCOUNT")
public class Account implements Serializable, Identifiable {

	private static final long serialVersionUID = 6363446764553001684L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull
	@NaturalId
	private String username;

	@NotNull
	private String password;

	@NotNull
	@Builder.Default
	private Role role = Role.USER;

	//
	@EqualsAndHashCode.Exclude
	@GsonExclude
	@ToString.Exclude
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	//

}
package com.hcmute.sneakerstore;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name="COLOR")
public @Data class Color{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int color_id;

	private String name;
	
	@OneToMany(
			mappedBy = "color", 
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private Set<Storage> storage;
	
	public Color() {
		
	}

	public int getColor_id() {
		return color_id;
	}

	public void setColor_id(int color_id) {
		this.color_id = color_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<Storage> getStorage() {
		return storage;
	}

	public void setStorage(Set<Storage> storage) {
		this.storage = storage;
	}

	
	
}
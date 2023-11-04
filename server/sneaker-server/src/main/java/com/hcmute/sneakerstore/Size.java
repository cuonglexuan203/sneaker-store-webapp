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
@Table(name="SIZE")
public @Data class Size{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int size_id;

	private int number;
	
	@OneToMany(
			mappedBy = "size", 
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private Set<Storage> storage;
	
	public Size() {
		
	}

	public int getSize_id() {
		return size_id;
	}

	public void setSize_id(int size_id) {
		this.size_id = size_id;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public Set<Storage> getStorage() {
		return storage;
	}

	public void setStorage(Set<Storage> storage) {
		this.storage = storage;
	}

	
}
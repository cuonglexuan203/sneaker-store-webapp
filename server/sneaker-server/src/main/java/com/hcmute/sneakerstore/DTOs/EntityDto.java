package com.hcmute.sneakerstore.DTOs;

import com.hcmute.sneakerstore.model.Identifiable;

import lombok.Data;

@Data
public class EntityDto implements Identifiable {
	private long id;

	@Override
	public long getId() {
		return id;
	}
}

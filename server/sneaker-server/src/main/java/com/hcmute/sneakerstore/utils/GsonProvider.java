package com.hcmute.sneakerstore.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hcmute.sneakerstore.utils.adapters.LocalDateTimeTypeAdapter;
import com.hcmute.sneakerstore.utils.adapters.LocalDateTypeAdapter;

public class GsonProvider {
	public static Gson getGsonInstance() {
		Gson gson = new GsonBuilder()
				.registerTypeAdapter(LocalDate.class,
						new LocalDateTypeAdapter())
				.registerTypeAdapter(LocalDateTime.class,
						new LocalDateTimeTypeAdapter())
				.create();
		return gson;
	}

}

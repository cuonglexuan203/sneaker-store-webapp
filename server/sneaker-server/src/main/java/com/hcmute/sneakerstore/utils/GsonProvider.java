package com.hcmute.sneakerstore.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hcmute.sneakerstore.utils.adapters.LocalDateTimeTypeAdapter;
import com.hcmute.sneakerstore.utils.adapters.LocalDateTypeAdapter;
import com.hcmute.sneakerstore.utils.annotations.GsonExclude;

public class GsonProvider {
	public static Gson getGsonInstance() {

		ExclusionStrategy strategy = new ExclusionStrategy() {

			@Override
			public boolean shouldSkipField(FieldAttributes f) {
				return f.getAnnotation(GsonExclude.class) != null;
			}

			@Override
			public boolean shouldSkipClass(Class<?> clazz) {
				return false;
			}
		};

		Gson gson = new GsonBuilder().setExclusionStrategies(strategy)
				.registerTypeAdapter(LocalDate.class,
						new LocalDateTypeAdapter())
				.registerTypeAdapter(LocalDateTime.class,
						new LocalDateTimeTypeAdapter())
				.create();
		return gson;

	}

}

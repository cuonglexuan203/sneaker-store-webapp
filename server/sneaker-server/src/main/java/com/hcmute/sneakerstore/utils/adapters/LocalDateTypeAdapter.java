package com.hcmute.sneakerstore.utils.adapters;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class LocalDateTypeAdapter implements JsonSerializer<LocalDate>, JsonDeserializer<LocalDate> {

	  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	  @Override
	  public JsonElement serialize(final LocalDate date,final Type typeOfSrc,
	      final JsonSerializationContext context) {
	    return new JsonPrimitive(date.format(formatter));
	  }

	  @Override
	  public LocalDate deserialize(final JsonElement json,final Type typeOfT,
	      final JsonDeserializationContext context) throws JsonParseException {
	    return LocalDate.parse(json.getAsString(), formatter);
	  }

	
	}
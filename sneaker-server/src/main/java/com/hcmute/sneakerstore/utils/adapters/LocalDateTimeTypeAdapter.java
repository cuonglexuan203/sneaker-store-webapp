package com.hcmute.sneakerstore.utils.adapters;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class LocalDateTimeTypeAdapter implements JsonSerializer<LocalDateTime>,
		JsonDeserializer<LocalDateTime> {

	private static final DateTimeFormatter formatter = DateTimeFormatter
			.ofPattern("d::MMM::uuuu HH::mm::ss");

	@Override
	public JsonElement serialize(LocalDateTime localDateTime, Type srcType,
			JsonSerializationContext context) {

		return new JsonPrimitive(formatter.format(localDateTime));
	}

	@Override
	public LocalDateTime deserialize(JsonElement json, Type typeOfT,
			JsonDeserializationContext context) throws JsonParseException {

		return LocalDateTime.parse(json.getAsString(), formatter);
	}
}
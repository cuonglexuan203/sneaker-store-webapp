package com.hcmute.sneakerstore.utils;

import java.util.Iterator;
import java.util.function.BiFunction;

public class CollectionUtils {
	
	// func(acc, item )
	public static <T> float aggregate(Iterator<T> iter, BiFunction<Float, T, Float> func, float initialValue) {

		// accumulator
		float acc = initialValue;
		
		while (iter.hasNext()) {
			
			T i = iter.next();
			acc = func.apply(acc, i);
		}
		return acc;
	}
	public static <T> float aggregate(Iterator<T> iter, BiFunction<Float, T, Float> func) {
		return aggregate(iter, func, 0.f);
	}
	
	
	
}

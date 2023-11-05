package com.hcmute.sneakerstore.utils;

import java.util.Iterator;
import java.util.function.BiFunction;

public class CollectionUtils {
	public static <T> Integer aggregate(Iterator<T> iter, BiFunction<Integer, T, Integer> func, int initialValue) {

		// accumulator
		Integer acc = initialValue;
		
		while (iter.hasNext()) {
			
			T i = iter.next();
			acc = func.apply(acc, i);
		}
		return acc;
	}
	public static <T> Integer aggregate(Iterator<T> iter, BiFunction<Integer, T, Integer> func) {
		return aggregate(iter, func, 0);
	}
}
